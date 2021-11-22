export type RootStackParams = {
  Main: undefined;
  Sample: undefined;
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
  RunningRoom: undefined;
  RegisterStock: { stockName: string; roomId: number };
  SearchStock: { roomId: number };
};
