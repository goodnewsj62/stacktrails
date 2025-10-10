"use client";

import ComingSoon from "@/common/utils/ComingSoon";

type CourseChatProps = {
  course_id: string;
};

const CourseChat: React.FC<CourseChatProps> = ({ course_id }) => {
  return <ComingSoon />;
};

export default CourseChat;
