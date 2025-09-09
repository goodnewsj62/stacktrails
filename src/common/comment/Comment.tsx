import { timeAgo } from "@/lib/utils";
import { Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";

type CommentProps = {
  data: CourseComment;
};

const Comment: React.FC<CommentProps> = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100">
      <Avatar
        src={data?.account?.profile?.avatar}
        alt={data?.account?.username}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => theme.palette.primary.main,
        }}
      >
        {data?.account?.username?.substring(0, 2)?.toUpperCase()}
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 text-sm">
            {data?.account?.username}
          </span>
          <span className="text-xs text-gray-500">
            {timeAgo(data.created_at)}
          </span>
        </div>
        <div className="text-gray-800 text-sm mb-2 whitespace-pre-line">
          {data.message}
        </div>
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
          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 font-medium ml-2">
            <FaRegCommentDots className="w-4 h-4" /> Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
