type Course = {
  title: string;
  image?: string;
  description?: string;
  short_description?: string;
  learning_objectives?: string[];
  prerequisites?: string[];
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
  updated_at: string;
};

type Author = {
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  id: string;
  profile: Profile;
};

type Profile = {
  display_name: string;
  bio: string;
  avatar: string;
};

type CourseContentMin = {
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
  updated_at: string;
  sections: Section[];
};
interface Section {
  title: string;
  description?: string;
  learning_objectives?: string[];
  order_index: number;
  estimated_duration_minutes: number;
  is_optional: boolean;
  progression_type: string;
  completion_criteria?: string[];
  id: string;
  course_id: string;
  modules: Module[];
}
interface Module {
  title: string;
  description?: string;
  content_data?: Contentdata;
  order_index: number;
  estimated_duration_minutes: number;
  is_required: boolean;
  prerequisites?: string[];
  settings?: Contentdata;
  id: string;
  section_id: string;
  module_type: "video" | "external_link" | "document" | "quiz" | "discussion";
}
type Contentdata = {
  additionalProp1: AdditionalProp1;
};
type AdditionalProp1 = {};
