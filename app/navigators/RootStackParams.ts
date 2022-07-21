import { SearchUser } from '../config/types';

export type RootStackParams = {
  Main: undefined;
  Home: undefined;
  Mypage: undefined;
  ChangeProfile: undefined;

  // initial
  Init: undefined;
  KakaoLogin: undefined;
  NaverLogin: undefined;
  GithubLogin: undefined;

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
  ResultRoom: { roomId: number; winCondition: number };
  RegisterStock: {
    stockName: string;
    roomId: number;
    ticker: string;
  };
  SearchStock: { roomId: number };
};
