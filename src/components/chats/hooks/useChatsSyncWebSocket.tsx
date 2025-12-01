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

type ChatsSyncEvent =
  | "chat.create"
  | "chat.direct.add"
  | "chat.accept"
  | "chat.join_public"
  | "chat.message.create"
  | "chat.update"
  | "chat.member.delete"
  | "chat.stat";

type ChatsSyncMessage = {
  event: ChatsSyncEvent;
  data: any;
};

type UseChatsSyncWebSocketProps = {
  enabled?: boolean;
  onChatCreated?: (data: any) => void;
  onAccept?: (data: any) => void;
  onNewMessage?: (data: any) => void;
  onChatUpdated?: (data: any) => void;
  onMemberDeleted?: (data: any) => void;
  onStatUpdated?: (data: any) => void;
};

/**
 * WebSocket hook for syncing the user's chat list.
 * Listens for events that affect the chat list order and updates:
 * - New chats created
 * - Chat updates (name, avatar, etc.)
 * - New messages (to update last_message_at and unread counts)
 */
export function useChatsSyncWebSocket({
  enabled = true,
  onChatCreated,
  onAccept,
  onNewMessage,
  onChatUpdated,
  onMemberDeleted,
  onStatUpdated,
}: UseChatsSyncWebSocketProps = {}) {
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
    onChatCreated,
    onAccept,
    onNewMessage,
    onChatUpdated,
    onMemberDeleted,
    onStatUpdated,
  });

  useEffect(() => {
    handlersRef.current = {
      onChatCreated,
      onAccept,
      onNewMessage,
      onChatUpdated,
      onMemberDeleted,
      onStatUpdated,
    };
  }, [
    onChatCreated,
    onAccept,
    onNewMessage,
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
      cleanupSocket();

      const baseWsUrl =
        process.env.NEXT_PUBLIC_WS_URL ||
        (typeof window !== "undefined" && window.location.protocol === "https:"
          ? "wss://"
          : "ws://") +
          (typeof window !== "undefined"
            ? window.location.host
            : "localhost:8082");

      // Connect to user's chat list sync endpoint
      const wsUrl = `${baseWsUrl}/ws/chat/?token=${token}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("[Chats Sync WS] Connected");
        retriesRef.current = 0;
        connectingRef.current = false;
        setIsConnecting(false);
        setIsConnected(true);
      };

      ws.onmessage = (e) => {
        try {
          const msg: ChatsSyncMessage = JSON.parse(e.data);
          const handlers = handlersRef.current;

          switch (msg.event) {
            case "chat.create":
              handlers.onChatCreated?.(msg.data);
              // Invalidate chat list to refetch
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.accept":
              handlers.onAccept?.(msg.data);
              // Invalidate to update chat info
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.join_public":
              handlers.onAccept?.(msg.data);
              // Invalidate to add new chat
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.direct.add":
              handlers.onChatCreated?.(msg.data);
              // Invalidate to add new direct chat
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.message.create":
              handlers.onNewMessage?.(msg.data);
              // Invalidate to update last_message_at and unread counts
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.update":
              handlers.onChatUpdated?.(msg.data);
              // Invalidate to update chat info (name, avatar, etc.)
              queryClient.invalidateQueries({
                queryKey: [cacheKeys.USER_CHATS],
              });
              break;
            case "chat.member.delete":
              handlers.onMemberDeleted?.(msg.data);
              // Invalidate to update member counts
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
              console.log("[Chats Sync WS] Unknown event:", msg.event);
          }
        } catch (err) {
          console.error("[Chats Sync WS] Invalid message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("[Chats Sync WS] Error:", err);
      };

      ws.onclose = (event) => {
        console.warn("[Chats Sync WS] Closed:", event.code, event.reason);
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
                console.error("[Chats Sync WS] Failed to refresh token:", err);
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
              console.error("[Chats Sync WS] Reconnect failed:", err);
            }
          }, backoff);
        }
      };
    },
    [cleanupSocket, queryClient]
  );

  const connect = useCallback(async () => {
    if (!user || !enabled || connectingRef.current) return;

    connectingRef.current = true;
    setIsConnecting(true);

    try {
      const token = await getFreshAccessToken();
      openSocketWithToken(token);
    } catch (err) {
      console.error("[Chats Sync WS] Initial connection failed:", err);
      connectingRef.current = false;
      setIsConnecting(false);
    }
  }, [user, enabled, openSocketWithToken]);

  useEffect(() => {
    if (enabled && user) {
      connect();
    }
    return () => {
      cleanupSocket();
    };
  }, [enabled, user, connect, cleanupSocket]);

  return {
    isConnected,
    isConnecting,
    connect,
    disconnect: cleanupSocket,
  };
}
