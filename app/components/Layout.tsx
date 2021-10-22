import React from 'react';
import styled from 'styled-components/native';

const StyledLayout = styled.View`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 20px;
  padding-bottom: 30px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Layout: React.FC = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
