import React from 'react';
import { ScrollView } from 'native-base';

type LayoutProps = {
  color?: string;
};
const Layout: React.FC<LayoutProps> = ({ children, color }) => {
  return (
    <ScrollView
      _contentContainerStyle={{
        flex: 1,
        position: 'relative',
        p: 6,
        pb: 10,
        bgColor: color ?? 'white',
      }}
    >
      {children}
    </ScrollView>
  );
};

export default Layout;
