import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';

const StyledInput = styled.TextInput`
  padding: 14px 20px;
  font-size: ${({ theme }) => theme.fontSize.md}
  border-radius: 10px;
  backgroundColor: ${({ theme }) => theme.colors.gray[700]};
`;

const Input: React.FC<TextInputProps> = () => {
  return <StyledInput />;
};

export default Input;
