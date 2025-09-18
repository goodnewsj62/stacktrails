"use client";

import StarRating from "@/components/courses/Stars";
import Comment from "./Comment";

type ReviewComponentProps = {
  data: CourseReview;
};
const ReviewComponent: React.FC<ReviewComponentProps> = ({ data }) => {
  return (
    <div className="space-y-2 py-2">
      <div className="star">
        <StarRating rating={data.star} editable={false} size="small" />
      </div>
      <div>
        <Comment data={data.comment} />
      </div>
    </div>
  );
};

export default ReviewComponent;
