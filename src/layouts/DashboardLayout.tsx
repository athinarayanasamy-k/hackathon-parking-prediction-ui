import React from 'react';
import { Button, Col, Row, Space, Typography } from 'antd';
import { useDashboardContext } from 'contexts/DashboardContext';

const { Text } = Typography;

interface DashboardLayoutProps {
  children?: React.ReactNode[];
  locationLabel?: string;
  onChangeLocation?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children = [],
  locationLabel,
  onChangeLocation,
}) => {
  const { summary } = useDashboardContext();
  const [summaryCards, zoneSection, chartSection, alertsSection, predictionsSection] = children;

  return (
    <div className="px-6 py-4 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <Text type="secondary" className="text-xs">
            Real-time utilisation health and AI predictions
          </Text>
          {locationLabel && (
            <div className="flex items-center gap-2">
              <Text type="secondary" className="text-[11px] uppercase tracking-wide">
                Location
              </Text>
              <Text className="font-medium">{locationLabel}</Text>
            </div>
          )}
        </div>
        <Space size={12} align="end">
          {onChangeLocation && (
            <Button size="small" type="primary" ghost onClick={onChangeLocation}>
              Change location
            </Button>
          )}
          {summary?.timestamp && (
            <div className="text-right">
              <Text className="text-emerald-600 font-semibold block">{summary.timestamp}</Text>
              {summary.dateLabel && (
                <Text type="secondary" className="text-xs">
                  {summary.dateLabel}
                </Text>
              )}
            </div>
          )}
        </Space>
      </div>

      {summaryCards}

      <Row gutter={[24, 24]} align="stretch">
        <Col xs={24} xl={15} className="flex">
          <div className="flex-1 h-full">{zoneSection}</div>
        </Col>
        <Col xs={24} xl={9}>
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <div style={{ minHeight: 340 }}>{chartSection}</div>
            <div style={{ minHeight: 220 }}>{alertsSection}</div>
          </Space>
        </Col>
      </Row>

      <Row gutter={[24, 24]} align="stretch">
        <Col span={24} className="flex">
          <div className="flex-1 h-full">{predictionsSection}</div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardLayout;
