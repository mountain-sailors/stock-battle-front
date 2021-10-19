import React from 'react';
import styled from 'styled-components/native'

const Layout: React.FC = ({ children }) => {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  );
}
const StyledLayout = styled.View`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 20px;
  padding-bottom: 30px;
  backgroundColor: ${({ theme }) => theme.colors.white};
`

export default Layout;
