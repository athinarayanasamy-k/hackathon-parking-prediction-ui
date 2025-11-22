import React from 'react';
import { Layout, Typography, Space, Avatar, Dropdown, Badge } from 'antd';
import { BellOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'constants/ApiConstants';
import { smartPalette } from 'constants/Themes';
import SmartSearch, { type SmartSearchOption } from 'components/SmartSearch';

const { Header } = Layout;
const { Text } = Typography;

const routeLabelMap: Record<string, string> = {
  [APP_ROUTES.OVERVIEW]: 'Overview',
  [APP_ROUTES.DASHBOARD]: 'Dashboard',
  [APP_ROUTES.PARKING_MAP]: 'Parking Map',
  [APP_ROUTES.BOOKINGS]: 'Bookings',
  [APP_ROUTES.ANALYTICS]: 'Analytics',
  [APP_ROUTES.NOTIFICATIONS]: 'Notifications',
  [APP_ROUTES.SETTINGS]: 'Settings',
};

const searchOptions: SmartSearchOption[] = Object.entries(routeLabelMap).map(([path, label]) => ({
  value: path,
  label,
}));

const MainHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const title = routeLabelMap[location.pathname] ?? 'SmartPark';

  const menuItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
    { key: 'logout', label: 'Logout' },
  ];

  return (
    <Header
      style={{
        background: smartPalette.siderBg, // your darker bar
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      {/* LEFT: title + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            color: '#F9FAFB',
          }}
        >
          {title}
        </h1>
      </div>

      {/* CENTER: responsive, centered search bar */}
      <div
        style={{
          flex: 1, // take all free space between left & right
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <SmartSearch
          options={searchOptions}
          placeholder="Search pages (e.g. Dashboard, Parking Map)"
          onSelect={(value) => navigate(value)}
          // clamp: min 260px, prefer ~60% of viewport, max 720px
          style={{ width: 'clamp(260px, 60vw, 720px)' }}
        />
      </div>

      {/* RIGHT: notifications + profile */}
      <Space size={24}>
        <Badge dot>
          <BellOutlined style={{ fontSize: 18, color: '#E5E7EB' }} />
        </Badge>

        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{ backgroundColor: smartPalette.primary }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#F9FAFB',
                  lineHeight: 1.1,
                }}
              >
                John Doe
              </span>
              <Text style={{ fontSize: 11, color: '#D1D5DB' }}>Admin</Text>
            </div>
            <DownOutlined style={{ fontSize: 10, color: '#E5E7EB' }} />
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default MainHeader;
