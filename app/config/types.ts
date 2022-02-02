export type GetMeRes = {
  userId: number;
  username: string;
  userEmail: string;
  point: number;
  avatar: string;
};

export type SearchUser = {
  id: number;
  username: string;
  email: string;
  point: number;
  avatar: string;
};
export type GetUserSearchRes = SearchUser[];
