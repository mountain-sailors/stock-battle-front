import { SearchUser } from '../config/types';

export type RootStackParams = {
  Main: undefined;
  Home: undefined;
  Mypage: undefined;
  ChangePassword: undefined;

  // initial
  Init: undefined;
  Login: undefined;
  SignUp: { email: string };
  ValidateEmail: undefined;
  Agreement: undefined;
  FindPassword: undefined;
  SendTempPwd: { email: string };

  // record
  Record: { user: object };
  SearchProfile: { handleUserChange: (newUser: SearchUser) => void };

  // createRoom
  AddRoomTitle: undefined;
  AddRoomInfo: { roomName: string };
  CompleteRoom: { roomCode: string };

  // enterRoom
  AddRoomCode: undefined;
  EnterRoom: undefined;

  // room
  WaitingRoom: { roomId: number; username: string };
  RunningRoom: { roomId: number };
  ResultRoom: { roomId: number };
  RegisterStock: { stockName: string; roomId: number };
  SearchStock: { roomId: number };
};
