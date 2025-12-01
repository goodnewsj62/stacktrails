import { appFetch } from "@/lib/appFetch";
import { cacheKeys } from "@/lib/cacheKeys";
import { BackendRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_RETRIES = 5;
const AUTH_MAX_RETRIES = 5;
const RECONNECT_DELAY = 1000;

async function getFreshAccessToken(): Promise<string> {
  const { data } = await appFetch<{ access_token: string }>(
    BackendRoutes.WS_SHORT_LIVED,
    { credentials: "include" }
  );
  return data.access_token;
}

type ChatMessageEvent =
  | "chat.message.create"
  | "chat.message.update"
  | "chat.message.delete"
  | "chat.update"
  | "chat.member.delete"
  | "chat.stat";

type ChatMessageWebSocketMessage = {
  event: ChatMessageEvent;
  data: any;
};

type UseChatMessagesWebSocketProps = {
  chatId?: string;
  enabled?: boolean;
  onMessageCreated?: (data: any) => void;
  onMessageUpdated?: (data: any) => void;
  onMessageDeleted?: (data: any) => void;
  onChatUpdated?: (data: any) => void;
  onMemberDeleted?: (data: any) => void;
  onStatUpdated?: (data: any) => void;
};

/**
 * WebSocket hook for managing messages in a specific chat.
 * Handles real-time message events, typing indicators, reactions, and read receipts.
 */
export function useChatMessagesWebSocket({
  chatId,
  enabled = true,
  onMessageCreated,
  onMessageUpdated,
  onMessageDeleted,
  onChatUpdated,
  onMemberDeleted,
  onStatUpdated,
}: UseChatMessagesWebSocketProps) {
  const { user } = useAppStore((s) => s);
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const connectingRef = useRef(false);
  const reconnectTimerRef = useRef<number | null>(null);
  const retriesRef = useRef(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Store handlers in refs to avoid dependency issues
  const handlersRef = useRef({
    onMessageCreated,
    onMessageUpdated,
    onMessageDeleted,
    onChatUpdated,
    onMemberDeleted,
    onStatUpdated,
  });

  useEffect(() => {
    handlersRef.current = {
      onMessageCreated,
      onMessageUpdated,
      onMessageDeleted,
      onChatUpdated,
      onMemberDeleted,
      onStatUpdated,
    };
  }, [
    onMessageCreated,
    onMessageUpdated,
    onMessageDeleted,
    onChatUpdated,
    onMemberDeleted,
    onStatUpdated,
  ]);

  const cleanupSocket = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;
      wsRef.current.onclose = null;
      try {
        wsRef.current.close(1000, "cleanup");
      } catch (e) {
        // ignore
      }
      wsRef.current = null;
    }
    connectingRef.current = false;
    setIsConnecting(false);
    setIsConnected(false);
  }, []);

  const openSocketWithToken = useCallback(
    (token: string) => {
      if (!chatId) return;

      cleanupSocket();

      const baseWsUrl =
        process.env.NEXT_PUBLIC_WS_URL ||
        (typeof window !== "undefined" && window.location.protocol === "https:"
          ? "wss://"
          : "ws://") +
          (typeof window !== "undefined"
            ? window.location.host
            : "localhost:8082");

      // Connect to specific chat's message stream
      const wsUrl = `${baseWsUrl}/ws/chat/${chatId}/?token=${token}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("[Chat Messages WS] Connected to chat:", chatId);
        retriesRef.current = 0;
        connectingRef.current = false;
        setIsConnecting(false);
        setIsConnected(true);
      };

      ws.onmessage = (e) => {
        try {
          const msg: ChatMessageWebSocketMessage = JSON.parse(e.data);
          const handlers = handlersRef.current;

          switch (msg.event) {
            case "chat.message.create":
              handlers.onMessageCreated?.(msg.data);
              // Invalidate messages query to refetch
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.CHAT_MESSAGES, chatId],
              });
              // Also invalidate chat list to update last_message_at
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.message.update":
              handlers.onMessageUpdated?.(msg.data);
              // Invalidate to update edited messages or reactions
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.CHAT_MESSAGES, chatId],
              });
              break;
            case "chat.message.delete":
              handlers.onMessageDeleted?.(msg.data);
              // Invalidate to remove deleted messages
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.CHAT_MESSAGES, chatId],
              });
              break;
            case "chat.update":
              handlers.onChatUpdated?.(msg.data);
              // Invalidate to update chat info
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.CHAT_MESSAGES, chatId],
              });
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.member.delete":
              handlers.onMemberDeleted?.(msg.data);
              // Invalidate to update member list
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.CHAT_MESSAGES, chatId],
              });
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.stat":
              handlers.onStatUpdated?.(msg.data);
              // Update unread counts in chat list
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            default:
              console.log("[Chat Messages WS] Unknown event:", msg.event);
          }
        } catch (err) {
          console.error("[Chat Messages WS] Invalid message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("[Chat Messages WS] Error:", err);
      };

      ws.onclose = (event) => {
        console.warn("[Chat Messages WS] Closed:", event.code, event.reason);
        setIsConnected(false);

        // Auth errors
        if ([1008, 4401, 4403].includes(event.code)) {
          if (retriesRef.current < AUTH_MAX_RETRIES) {
            retriesRef.current += 1;
            reconnectTimerRef.current = window.setTimeout(async () => {
              try {
                const newToken = await getFreshAccessToken();
                openSocketWithToken(newToken);
              } catch (err) {
                console.error(
                  "[Chat Messages WS] Failed to refresh token:",
                  err
                );
              }
            }, RECONNECT_DELAY * retriesRef.current);
          }
          return;
        }

        // Normal close
        if (event.code === 1000) {
          cleanupSocket();
          return;
        }

        // Reconnect with exponential backoff
        if (retriesRef.current < MAX_RETRIES) {
          retriesRef.current += 1;
          const backoff = Math.min(
            RECONNECT_DELAY * Math.pow(2, retriesRef.current),
            30000
          );
          reconnectTimerRef.current = window.setTimeout(async () => {
            try {
              const token = await getFreshAccessToken();
              openSocketWithToken(token);
            } catch (err) {
              console.error("[Chat Messages WS] Reconnect failed:", err);
            }
          }, backoff);
        }
      };
    },
    [chatId, cleanupSocket, queryClient]
  );

  const connect = useCallback(async () => {
    if (!user || !enabled || !chatId || connectingRef.current) return;

    connectingRef.current = true;
    setIsConnecting(true);

    try {
      const token = await getFreshAccessToken();
      openSocketWithToken(token);
    } catch (err) {
      console.error("[Chat Messages WS] Initial connection failed:", err);
      connectingRef.current = false;
      setIsConnecting(false);
    }
  }, [user, enabled, chatId, openSocketWithToken]);

  useEffect(() => {
    if (enabled && chatId && user) {
      connect();
    }
    return () => {
      cleanupSocket();
    };
  }, [enabled, chatId, user, connect, cleanupSocket]);

  const sendMessage = useCallback((event: string, data: any) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn("[Chat Messages WS] Cannot send - not connected");
      return false;
    }
    ws.send(JSON.stringify({ event, data }));
    return true;
  }, []);

  const sendChatMessage = useCallback(
    (data: ChatMessageWrite) => {
      return sendMessage("chat.message.create", data);
    },
    [sendMessage]
  );

  const updateMessage = useCallback(
    (data: ChatMessageUpdate, messageId: string) => {
      return sendMessage("chat.message.update", {
        ...data,
        message_id: messageId,
      });
    },
    [sendMessage]
  );

  const deleteMessage = useCallback(
    (messageId: string) => {
      return sendMessage("chat.message.delete", messageId);
    },
    [sendMessage]
  );

  const addReaction = useCallback(
    (messageId: string, data: ChatMessageReactionWrite) => {
      return sendMessage("chat.reaction.create", {
        message_id: messageId,
        data,
      });
    },
    [sendMessage]
  );

  const removeReaction = useCallback(
    (messageId: string, data: ChatMessageReactionWrite) => {
      return sendMessage("chat.reaction.delete", {
        message_id: messageId,
        data,
      });
    },
    [sendMessage]
  );

  const updateChat = useCallback(
    (data: ChatUpdate) => {
      return sendMessage("chat.update", data);
    },
    [sendMessage]
  );

  const removeMember = useCallback(
    (memberId: string) => {
      return sendMessage("chat.member.delete", memberId);
    },
    [sendMessage]
  );

  return {
    isConnected,
    isConnecting,
    sendChatMessage,
    updateMessage,
    deleteMessage,
    addReaction,
    removeReaction,
    updateChat,
    removeMember,
    sendMessage,
    connect,
    disconnect: cleanupSocket,
  };
}
