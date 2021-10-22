import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps, View } from 'react-native';

const StyledStatusCard = styled.TextInput`
  padding: 14px 20px;
  font-size: ${({ theme }) => theme.fontSize.md}
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray[700]};
`;

const statusCard: React.FC<TextInputProps> = () => {
  return (
    <StyledStatusCard>
      <View>방이름</View>
    </StyledStatusCard>
  );
};

export default statusCard;
