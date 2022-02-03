// GET /me
export type GetMeRes = {
  userId: number;
  username: string;
  userEmail: string;
  point: number;
  avatar: string;
};

// GET /user/search?username=admin
export type SearchUser = {
  id: number;
  username: string;
  email: string;
  point: number;
  avatar: string;
};
export type GetUserSearchRes = SearchUser[];

// GET /stock
export type Stock = {
  ticker: string;
  price: number;
  stockName: string;
};
export type GetStockRes = Stock[];

// GET /user-stock/:roomId
export type UserStock = {
  userId: number;
  username: string;
  ticker: string;
  amount: number;
  stockName: string;
};
export type GetUserStockRes = UserStock[];

// GET /player/:roomId
export type Player = {
  userId: number;
  username: string;
  avatar: string;
};
export type GetPlayerRes = Player[];

// GET /room
const gameStatusType = [
  'NOT_STARTED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const;
export type Room = {
  id: 0;
  title: string;
  startDate: string;
  endDate: string;
  rank: 0;
  profit: 0;
  gameStatus: typeof gameStatusType;
};
export type GetRoomRes = Room[];
