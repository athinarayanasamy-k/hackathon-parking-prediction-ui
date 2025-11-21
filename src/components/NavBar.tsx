// src/components/NavBar.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  BookOutlined,
  BarChartOutlined,
  BellOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'constants/ApiConstants';
import { smartPalette } from 'constants/Themes';

const { Sider } = Layout;

interface NavBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider
      collapsed={collapsed}
      collapsible
      trigger={null}
      width={220}
      collapsedWidth={72}
      style={{
        background: smartPalette.paper, // light, matches app background
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column', // logo + menu + bottom trigger
      }}
    >
      {/* Logo area */}
      <div
        style={{
          height: 64,
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            height: 32,
            width: 32,
            borderRadius: 999,
            background: smartPalette.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
          }}
        >
          P
        </div>
        {!collapsed && (
          <span
            style={{
              color: '#111827',
              fontWeight: 600,
              fontSize: 18,
              whiteSpace: 'nowrap',
            }}
          >
            SmartPark
          </span>
        )}
      </div>

      {/* Menu */}
      <Menu
        theme="light" // <<< important: dark text/icons
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        style={{
          flex: 1, // pushes trigger to bottom
          height: '87vh',
          borderRight: 'none',
          background: 'transparent',
          padding: '12px 8px',
        }}
        items={[
          {
            key: APP_ROUTES.OVERVIEW,
            icon: <AppstoreOutlined />,
            label: 'Overview',
          },
          {
            key: APP_ROUTES.DASHBOARD,
            icon: <DashboardOutlined />,
            label: 'Dashboard',
          },
          {
            key: APP_ROUTES.PARKING_MAP,
            icon: <EnvironmentOutlined />,
            label: 'Parking Map',
          },
          {
            key: APP_ROUTES.BOOKINGS,
            icon: <BookOutlined />,
            label: 'Bookings',
          },
          {
            key: APP_ROUTES.ANALYTICS,
            icon: <BarChartOutlined />,
            label: 'Analytics',
          },
          {
            key: APP_ROUTES.NOTIFICATIONS,
            icon: <BellOutlined />,
            label: 'Notifications',
          },
          {
            key: APP_ROUTES.SETTINGS,
            icon: <SettingOutlined />,
            label: 'Settings',
          },
        ]}
      />

      {/* Bottom collapse toggle */}
      <div
        style={{
          height: 48,
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: smartPalette.gray,
          fontSize: 18,
        }}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </Sider>
  );
};

export default NavBar;
