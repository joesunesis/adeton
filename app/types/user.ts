export type User = {
  id: string;
  phone: string;
  name: string;
  gender: string;
  image_url?: string;
  is_admin?: boolean;
  is_online?: boolean;
  created_at?: string;
  updated_at?: string;
}