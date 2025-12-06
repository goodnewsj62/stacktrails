import ChatHeader from "@/components/chats/fragments/ChatHeader";
import ChatInputBox from "@/components/chats/fragments/input/ChatInputBox";
import Message from "@/components/chats/fragments/message/Message";
import { useChatMessagesWebSocket } from "@/components/chats/hooks/useChatMessagesWebSocket";
import appAxios from "@/lib/axiosClient";
import { cacheKeys } from "@/lib/cacheKeys";
import { BackendRoutes } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

type ChatMainProps = {
  chat: ChatRead;
  clearCurrentChat: () => void;
};

export default function ChatMain({ chat, clearCurrentChat }: ChatMainProps) {
  const [messages, setMessages] = useState<ChatMessageRead[]>([]);

  const { data: memberData, isLoading: isLoadingMembers } = useQuery({
    queryKey: [cacheKeys.CHAT_MEMBERS, chat.id],
    queryFn: async (): Promise<PaginatedChatMemberRead> => {
      const resp = await appAxios.get(BackendRoutes.LIST_CHAT_MEMBERS(chat.id));
      return resp.data;
    },
  });

  const handlers = useMemo(
    () => ({
      onInitial: (msg: PaginatedMessagesResp) => {
        setMessages(msg.items);
      },
      onMessageCreated: (msg: ChatMessageRead) => {
        setMessages((prev) => [...prev, msg]);
      },
      onMessageUpdated: (data: ChatMessageRead) => {
        console.log("||||||||||||||||||||||", data);
        setMessages((prev) =>
          prev.map((d) => {
            if (d.id === data.id) return data;
            return d;
          })
        );
      },
      onMessageDeleted: (data: any) => {},
      onStatUpdated: (msg: ChatStatRead) => {},
    }),
    []
  );
  const { isConnected, sendChatMessage, updateMessage, deleteMessage } =
    useChatMessagesWebSocket({
      chatId: chat.id,
      handlers,
    });

  return (
    <section className="bg-gray-100 flex flex-col justify-items-stretch items-stretch h-full relative ">
      <ChatHeader
        data={chat}
        members={memberData?.items || []}
        onBack={clearCurrentChat}
        onSearch={() => {}}
        onDateFilter={() => {}}
      />
      <section className="relative grow overflow-y-auto px-4 py-4">
        <div className="flex flex-col">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onEdit={(messageId, content) => {
                updateMessage({ content }, messageId);
              }}
              onDelete={(messageId) => {
                deleteMessage(messageId);
              }}
            />
          ))}
        </div>
      </section>
      <ChatInputBox
        onSend={(message: string) => {
          const result = sendChatMessage({
            chat_id: chat.id,
            content: message,
            message_type: "text",
          });
          console.log("[ChatMain] Message send result:", result);
        }}
      />
    </section>
  );
}
