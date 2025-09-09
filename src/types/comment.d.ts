type CourseComment = {
  message: string;
  likes: number;
  comment_count: number;
  is_rating: boolean;
  id: string;
  creator_id: string;
  course_id: string;
  reply_to_id: string;
  mention_id: string;
  reply_to: Replyto;
  mention: Mention;
  account: User;
  created_at: string;
};

type Mention = {
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  id: string;
};
type Replyto = {
  message: string;
  likes: number;
  comment_count: number;
  is_rating: boolean;
};

type CourseReview = {
  star: number;
  message: string;
  id: string;
  account_id: string;
  course_id: string;
  comment_id: string;
  comment: CourseComment;
  created_at: string;
};
