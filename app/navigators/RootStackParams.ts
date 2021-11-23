export type RootStackParams = {
  Main: undefined;
  Home: undefined;
  Init: undefined;
  Login: undefined;
  SignUp: undefined;
  Record: undefined;
  SearchProfile: undefined;
  AddRoomTitle: undefined;
  AddRoomInfo: { roomName: string };
  CompleteRoom: { roomCode: string };
  WaitingRoom: { roomId: number; username: string };
  ResultRoom: undefined;
  RunningRoom: { roomId: number };
  RegisterStock: { stockName: string; roomId: number };
  SearchStock: { roomId: number };
  Mypage: undefined;
};
