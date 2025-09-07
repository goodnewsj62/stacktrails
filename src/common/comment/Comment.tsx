import { Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import CreateComment from "./CreateComment";

type CommentProps = {
  username: string;
  avatarUrl?: string;
  timeAgo: string;
  text: string;
};

const Comment: React.FC<CommentProps> = ({
  username,
  avatarUrl,
  timeAgo,
  text,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showReply, setShowReply] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleReplySubmit = (replyText: string) => {
    // setReplies((prev) => [...prev, replyText]);
    // setShowReply(false);
  };

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100">
      <Avatar src={avatarUrl} alt={username} sx={{ width: 40, height: 40 }}>
        {username.substring(0, 2).toUpperCase()}
      </Avatar>

      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 text-sm">
            {username}
          </span>
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>

        {/* Comment text */}
        <div className="text-gray-800 text-sm mb-2 whitespace-pre-line">
          {text}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-1">
          <IconButton
            size="small"
            onClick={handleLike}
            aria-label="Like"
            className="!p-1"
          >
            {liked ? (
              <BsHandThumbsUpFill fontSize="small" color="primary" />
            ) : (
              <BsHandThumbsUp fontSize="small" />
            )}
          </IconButton>
          <span className="text-xs text-gray-600">{likeCount}</span>

          <button
            onClick={() => setShowReply((prev) => !prev)}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 font-medium ml-2"
          >
            <FaRegCommentDots className="w-4 h-4" /> Reply
          </button>
        </div>

        {/* Reply input */}
        {showReply && (
          <div className="mt-3">
            <CreateComment
              avatarUrl={avatarUrl}
              username={username}
              onSubmit={handleReplySubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
