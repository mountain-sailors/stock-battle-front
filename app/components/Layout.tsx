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
  flex: 1;
  padding: 20px;
  backgroundColor: ${({ theme }) => theme.colors.white};
`

export default Layout;
