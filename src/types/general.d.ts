type Profile = {
  display_name: string;
  bio: string;
  avatar: string;
  id: string;
  account_id: string;
  username?: string;
};

type User = {
  username: string;
  id: string;
  is_active: boolean;
  email: string;
  profile: Profile;
};

type Paginated<T> = {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
  items: T[];
};
