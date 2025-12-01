/*
    message can take many forms from 
    - reference to course module 
    - image (support small image upload )
    - text
    - links
    etc  this is the component that acts as the engine to represent the message as 
    it should 

    message from the current user should start from the right and can
    only span 80%
    and message from the others should start from the left and can only span 80% the total width 
    this means each message wrapper has a width 100% but the secondary wrapper will be 80%
 */

"use client";

import MarkdownRenderer from "@/common/markdown/AppMdRenderer";
import { cn, getImageProxyUrl, timeAgo } from "@/lib/utils";
import { useAppStore } from "@/store";
import { Avatar } from "@mui/material";
import { FaBook } from "@react-icons/all-files/fa/FaBook";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaFile } from "@react-icons/all-files/fa/FaFile";
import Image from "next/image";

type MessageProps = {
  message: ChatMessageRead;
};

// Helper function to format file size
function formatFileSize(bytes?: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Message({ message }: MessageProps) {
  const { user } = useAppStore((state) => state);

  // Determine if message is from current user
  const isCurrentUser = message.sender_id === user?.id;

  // Get sender info
  const senderName =
    message.sender?.account?.profile?.display_name ||
    message.sender?.account?.username ||
    "Unknown";
  const senderAvatar =
    message.sender?.account?.profile?.avatar ||
    message.chat?.avatar_url ||
    undefined;

  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(senderName);

  // Handle deleted messages
  if (message.is_deleted) {
    return (
      <div
        className={cn(
          "w-full flex",
          isCurrentUser ? "justify-end" : "justify-start"
        )}
      >
        <div className="w-[80%] flex gap-2">
          {!isCurrentUser && (
            <div className="flex-shrink-0">
              <Avatar
                src={senderAvatar || undefined}
                alt={senderName}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "100%",
                  bgcolor: "black",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {initials}
              </Avatar>
            </div>
          )}
          <div
            className={cn(
              "flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-500 italic text-sm"
            )}
          >
            This message was deleted
          </div>
        </div>
      </div>
    );
  }

  // Render message content based on type
  const renderMessageContent = () => {
    switch (message.message_type) {
      case "TEXT":
        if (!message.content) return null;
        return (
          <div className="text-gray-900 whitespace-pre-wrap break-words">
            <MarkdownRenderer content={message.content} />
          </div>
        );

      case "IMAGE":
        if (!message.file_url) return null;
        return (
          <div className="space-y-2">
            <div className="relative rounded-lg overflow-hidden max-w-md">
              <Image
                src={getImageProxyUrl(message.file_url) || "/placeholder.png"}
                alt={message.file_name || "Image"}
                width={400}
                height={300}
                className="w-full h-auto object-contain rounded-lg"
                style={{ maxHeight: "400px" }}
              />
            </div>
            {message.content && (
              <div className="text-gray-900 whitespace-pre-wrap break-words text-sm">
                <MarkdownRenderer content={message.content} />
              </div>
            )}
          </div>
        );

      case "FILE":
        return (
          <div className="space-y-2">
            <a
              href={message.file_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              <div className="flex-shrink-0 text-gray-600">
                <FaFile className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {message.file_name || "File"}
                </p>
                {message.file_size && (
                  <p className="text-xs text-gray-500">
                    {formatFileSize(message.file_size)}
                  </p>
                )}
              </div>
            </a>
            {message.content && (
              <div className="text-gray-900 whitespace-pre-wrap break-words text-sm">
                <MarkdownRenderer content={message.content} />
              </div>
            )}
          </div>
        );

      case "SYSTEM":
        return (
          <div className="text-center text-gray-500 text-sm italic">
            {message.content || "System message"}
          </div>
        );

      default:
        return (
          <div className="text-gray-900 whitespace-pre-wrap break-words">
            {message.content || "Message"}
          </div>
        );
    }
  };

  // Check for course module reference in extra_data
  const courseModuleRef = message.extra_data?.course_module;
  const courseRef = message.chat?.course;

  // System messages have special layout (centered, no bubble)
  if (message.message_type === "SYSTEM") {
    return (
      <div className="w-full flex justify-center mb-4">
        <div className="w-[80%]">{renderMessageContent()}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full flex mb-4",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "w-[80%] flex gap-2",
          isCurrentUser && "flex-row-reverse"
        )}
      >
        {/* Avatar - only show for other users */}
        {!isCurrentUser && (
          <div className="flex-shrink-0">
            <Avatar
              src={senderAvatar || undefined}
              alt={senderName}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "100%",
                bgcolor: "black",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {initials}
            </Avatar>
          </div>
        )}

        {/* Message Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Sender name and timestamp - only for other users */}
          {!isCurrentUser && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-700">
                {senderName}
              </span>
              {message.created_at && (
                <span className="text-xs text-gray-500">
                  {timeAgo(message.created_at)}
                </span>
              )}
            </div>
          )}

          {/* Course Module Reference */}
          {courseModuleRef && courseRef && (
            <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <FaBook className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Course Module Reference
                </span>
              </div>
              <p className="text-xs text-blue-700">{courseRef.title}</p>
              {courseModuleRef.title && (
                <p className="text-xs text-blue-600 mt-1">
                  Module: {courseModuleRef.title}
                </p>
              )}
            </div>
          )}

          {/* Message Bubble */}
          <div
            className={cn(
              "px-4 py-2 rounded-lg",
              isCurrentUser
                ? "bg-[#3e3d3d] text-white [&_*]:text-white [&_a]:text-blue-200 [&_a:hover]:text-white"
                : "bg-white border border-gray-200 text-gray-900"
            )}
          >
            {renderMessageContent()}
          </div>

          {/* Edited indicator and timestamp for current user */}
          {isCurrentUser && (
            <div className="flex items-center gap-2 mt-1 justify-end">
              {message.is_edited && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <FaEdit className="w-3 h-3" />
                  Edited
                </span>
              )}
              {message.created_at && (
                <span
                  className={cn(
                    "text-xs",
                    isCurrentUser ? "text-gray-400" : "text-gray-500"
                  )}
                >
                  {timeAgo(message.created_at)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
