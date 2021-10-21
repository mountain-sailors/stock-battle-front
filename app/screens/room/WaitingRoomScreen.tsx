import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type WaitingRoomScreenProp = StackScreenProps<RootStackParams, 'CompleteRoom'>;
const WaitingRoomScreen: React.FC<WaitingRoomScreenProp> = () => {
  return <Layout>hi</Layout>;
};

export default WaitingRoomScreen;
