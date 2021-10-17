import React from 'react';
import styled, { DefaultTheme } from 'styled-components/native'

const variant = ['filled', 'outlined', 'disabled'] as const;
type Ivariant = typeof variant[number];

interface ButtonProps {
  title: string,
  variant?: Ivariant,
  onClick: () => void,
}

const Button: React.FC<ButtonProps> = ({ title, variant, onClick }) => {
  return (
    <StyledButton
      onPress={() => onClick()}
      variant={variant ?? 'filled'}
    >
      <StyledText variant={variant ?? 'filled'}>
        {title}
      </StyledText>
    </StyledButton>
  );
}

const handleTextColor = (variant: Ivariant, theme: DefaultTheme) => {
  switch (variant) {
    case 'filled':
      return theme.colors.white;
    case 'outlined':
      return theme.colors.black;
    case 'disabled':
      return theme.colors.gray[300];
  }
}
const handleBackground = (variant: Ivariant, theme: DefaultTheme) => {
  switch (variant) {
    case 'filled':
      return `background: ${theme.colors.black}; border: none;`;
    case 'outlined':
      return `background: ${theme.colors.white}; border: 1px solid ${theme.colors.black};`;
    case 'disabled':
      return `background: ${theme.colors.gray[600]}; border: none;`;
  }
}
interface StyledButtonProps {
  variant: Ivariant;
  theme: DefaultTheme;
}

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  border-radius: 10px;
  padding: 13px;
  height: 45px;
  ${({ variant, theme }) => handleBackground(variant, theme)}
`
interface StyledTextProps {
  variant: Ivariant;
  theme: DefaultTheme;
}
const StyledText = styled.Text<StyledTextProps>`
  font-size: ${({ theme }) => theme.fontSize.md}
  text-align: center;
  color: ${({ variant, theme }) => handleTextColor(variant, theme)};
`

export default Button;
