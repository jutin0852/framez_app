export type User = {
  id: string;
  name: string;
  email: string | null;
  bio: string | null;
  phoneNumber: string | null;
  image: string | null;
  created_at: string;
};

export type Posts = {
  body: string;
  created_at: string;
  file: string | null;
  id: string;
  user: {
    id: string;
    image: string | null;
    name: string;
  };
  userId: string;
};
