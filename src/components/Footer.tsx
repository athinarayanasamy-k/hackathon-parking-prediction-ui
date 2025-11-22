import React from 'react';
import { Layout, Typography } from 'antd';
import { smartPalette } from 'constants/Themes';

const { Footer } = Layout;
const { Text } = Typography;

const PageFooter: React.FC = () => {
  return (
    <Footer
      style={{
        background: smartPalette.siderBg,
        padding: '8px 24px',
        borderTop: '1px solid #e5e7eb',
      }}
    >
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Text>© {new Date().getFullYear()} SmartPark</Text>
        <Text>All systems operational</Text>
      </div>
    </Footer>
  );
};

export default PageFooter;
