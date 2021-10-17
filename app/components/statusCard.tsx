import React from 'react';
import styled from 'styled-components/native'
import { TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps{};
const statusCard: React.FC<InputProps> = (props) => {
  return (
    <StyledStatusCard {...props}>
		<View>방이름</View>
	</StyledStatusCard>
  );
}
const StyledStatusCard = styled.TextInput`
  padding: 14px 20px;
  font-size: ${({ theme }) => theme.fontSize.md}
  border-radius: 10px;
  backgroundColor: ${({ theme }) => theme.colors.gray[700]};
`

export default statusCard;
