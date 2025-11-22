import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { smartPalette } from 'constants/Themes';
import NavBar from 'components/NavBar';
import { Footer } from 'antd/es/layout/layout';
import MainHeader from 'features/MainHeader';

import React from 'react';

const { Content } = Layout;

const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  return (
    <Layout style={{ minHeight: '100vh', background: smartPalette.paper }}>
      <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 72 : 220,
          transition: 'margin-left 0.2s cubic-bezier(0.4,0,0.2,1)',
          minHeight: '100vh',
          background: smartPalette.paper,
        }}
      >
        <MainHeader />
        <Content style={{ padding: 15 }}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default RootLayout;
