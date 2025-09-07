"use client";

import StarRating from "@/components/courses/Stars";
import Comment from "./Comment";

type ReviewComponentProps = {
  text: string;
  username: string;
};
const ReviewComponent: React.FC<ReviewComponentProps> = ({
  text,
  username,
}) => {
  return (
    <div className="space-y-2 py-2">
      <div className="star">
        <StarRating rating={5} editable={false} size="small" />
      </div>
      <div>
        <Comment text={text} timeAgo="2hrs ago" username={username} />
      </div>
    </div>
  );
};

export default ReviewComponent;
