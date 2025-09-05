type Course = {
  title: string;
  image: string;
  description: string;
  short_description: string;
  learning_objectives: string[];
  prerequisites: string[];
  difficulty_level: string;
  estimated_duration_hours: number;
  language: string;
  status: string;
  enrollment_type: string;
  visibility: string;
  certification_enabled: boolean;
  id: string;
  slug: string;
  account_id: string;
  author: Author;
  average_rating: number;
  total_rating: number;
  stars: number;
  enrollment_count: number;
  comment_count: number;
};

type Author = {
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  id: string;
};
