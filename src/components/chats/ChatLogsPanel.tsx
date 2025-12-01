import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import { useState } from "react";
import ChatLog from "./fragments/ChatLog";

type ChatLogsPanelProps = {};

// Dummy chat data
const dummyChats: ChatRead[] = [
  {
    id: "1",
    chat_type: "DIRECT",
    name: undefined,
    description: undefined,
    avatar_url: undefined,
    privacy: undefined,
    is_active: true,
    last_message_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
    account_id: "user1",
    course_id: undefined,
    account: {
      id: "user1",
      username: "johndoe",
      email: "john@example.com",
      is_active: true,
      profile: {
        id: "profile1",
        account_id: "user1",
        display_name: "John Doe",
        bio: "Software developer",
        avatar: undefined,
      },
    },
  },
  {
    id: "2",
    chat_type: "GROUP",
    name: "React Developers",
    description: "Discussion about React best practices",
    avatar_url: undefined,
    privacy: "PUBLIC",
    is_active: true,
    last_message_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    account_id: "user2",
    course_id: undefined,
    account: {
      id: "user2",
      username: "admin",
      email: "admin@example.com",
      is_active: true,
      profile: {
        id: "profile2",
        account_id: "user2",
        display_name: "Admin",
        avatar: undefined,
      },
    },
  },
  {
    id: "3",
    chat_type: "DIRECT",
    name: undefined,
    description: undefined,
    avatar_url: undefined,
    privacy: undefined,
    is_active: true,
    last_message_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hrs ago
    account_id: "user3",
    course_id: undefined,
    account: {
      id: "user3",
      username: "sarahsmith",
      email: "sarah@example.com",
      is_active: true,
      profile: {
        id: "profile3",
        account_id: "user3",
        display_name: "Sarah Smith",
        avatar: undefined,
      },
    },
  },
  {
    id: "4",
    chat_type: "GROUP",
    name: "TypeScript Study Group",
    description: "Learning TypeScript together",
    avatar_url: undefined,
    privacy: "PRIVATE",
    is_active: true,
    last_message_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hrs ago
    account_id: "user4",
    course_id: undefined,
    account: {
      id: "user4",
      username: "teacher",
      email: "teacher@example.com",
      is_active: true,
      profile: {
        id: "profile4",
        account_id: "user4",
        display_name: "Teacher",
        avatar: undefined,
      },
    },
  },
  {
    id: "5",
    chat_type: "DIRECT",
    name: undefined,
    description: undefined,
    avatar_url: undefined,
    privacy: undefined,
    is_active: true,
    last_message_at: new Date(
      Date.now() - 1 * 24 * 60 * 60 * 1000
    ).toISOString(), // 1 day ago
    account_id: "user5",
    course_id: undefined,
    account: {
      id: "user5",
      username: "mikejones",
      email: "mike@example.com",
      is_active: true,
      profile: {
        id: "profile5",
        account_id: "user5",
        display_name: "Mike Jones",
        avatar: undefined,
      },
    },
  },
  {
    id: "6",
    chat_type: "GROUP",
    name: "Web Development",
    description: "General web dev discussions",
    avatar_url: undefined,
    privacy: "PUBLIC",
    is_active: true,
    last_message_at: new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ).toISOString(), // 2 days ago
    account_id: "user6",
    course_id: undefined,
    account: {
      id: "user6",
      username: "moderator",
      email: "mod@example.com",
      is_active: true,
      profile: {
        id: "profile6",
        account_id: "user6",
        display_name: "Moderator",
        avatar: undefined,
      },
    },
  },
  {
    id: "7",
    chat_type: "DIRECT",
    name: undefined,
    description: undefined,
    avatar_url: undefined,
    privacy: undefined,
    is_active: true,
    last_message_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    account_id: "user7",
    course_id: undefined,
    account: {
      id: "user7",
      username: "emilychen",
      email: "emily@example.com",
      is_active: true,
      profile: {
        id: "profile7",
        account_id: "user7",
        display_name: "Emily Chen",
        avatar: undefined,
      },
    },
  },
  {
    id: "8",
    chat_type: "GROUP",
    name: "Next.js Community",
    description: "Next.js tips and tricks",
    avatar_url: undefined,
    privacy: "RESTRICTED",
    is_active: true,
    last_message_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hrs ago
    account_id: "user8",
    course_id: undefined,
    account: {
      id: "user8",
      username: "founder",
      email: "founder@example.com",
      is_active: true,
      profile: {
        id: "profile8",
        account_id: "user8",
        display_name: "Founder",
        avatar: undefined,
      },
    },
  },
  {
    id: "9",
    chat_type: "DIRECT",
    name: undefined,
    description: undefined,
    avatar_url: undefined,
    privacy: undefined,
    is_active: true,
    last_message_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hrs ago
    account_id: "user9",
    course_id: undefined,
    account: {
      id: "user9",
      username: "alexbrown",
      email: "alex@example.com",
      is_active: true,
      profile: {
        id: "profile9",
        account_id: "user9",
        display_name: "Alex Brown",
        avatar: undefined,
      },
    },
  },
  {
    id: "10",
    chat_type: "GROUP",
    name: "Design Team",
    description: "UI/UX design discussions",
    avatar_url: undefined,
    privacy: "PRIVATE",
    is_active: true,
    last_message_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hrs ago
    account_id: "user10",
    course_id: undefined,
    account: {
      id: "user10",
      username: "designer",
      email: "designer@example.com",
      is_active: true,
      profile: {
        id: "profile10",
        account_id: "user10",
        display_name: "Designer",
        avatar: undefined,
      },
    },
  },
];

export default function ChatLogsPanel(props: ChatLogsPanelProps) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Dummy unread counts and reply indicators
  const chatMetadata: Record<
    string,
    { unreadCount: number; hasReply: boolean; lastMessage: string }
  > = {
    "1": {
      unreadCount: 3,
      hasReply: true,
      lastMessage: "Hey, how are you doing?",
    },
    "2": {
      unreadCount: 12,
      hasReply: false,
      lastMessage: "Check out this new React hook!",
    },
    "3": {
      unreadCount: 0,
      hasReply: false,
      lastMessage: "Thanks for the help!",
    },
    "4": {
      unreadCount: 5,
      hasReply: true,
      lastMessage: "Let's schedule a study session",
    },
    "5": { unreadCount: 1, hasReply: false, lastMessage: "See you tomorrow!" },
    "6": {
      unreadCount: 0,
      hasReply: false,
      lastMessage: "Great discussion everyone!",
    },
    "7": {
      unreadCount: 7,
      hasReply: false,
      lastMessage: "Can you review my code?",
    },
    "8": {
      unreadCount: 2,
      hasReply: true,
      lastMessage: "New Next.js feature released!",
    },
    "9": { unreadCount: 0, hasReply: false, lastMessage: "Got it, thanks!" },
    "10": {
      unreadCount: 4,
      hasReply: false,
      lastMessage: "What do you think about this design?",
    },
  };

  return (
    <section className="flex flex-col h-full relative">
      {/* search area */}
      <div className="p-4 border-b sticky top-0 z-10 bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full px-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <IoSearch className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* list of chats */}
      <div className="flex-1 overflow-y-auto">
        {dummyChats.map((chat) => {
          const metadata = chatMetadata[chat.id] || {
            unreadCount: 0,
            hasReply: false,
            lastMessage: "No messages yet",
          };

          return (
            <ChatLog
              key={chat.id}
              data={chat}
              unreadCount={metadata.unreadCount}
              hasReply={metadata.hasReply}
              isActive={activeChatId === chat.id}
              lastMessage={metadata.lastMessage}
              onClick={() => setActiveChatId(chat.id)}
            />
          );
        })}
      </div>

      {/* search result list */}
    </section>
  );
}
