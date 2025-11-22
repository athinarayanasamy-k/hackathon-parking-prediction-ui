import React from 'react';
import { Card, Typography } from 'antd';
import type { CSSProperties } from 'react';
import { useDashboardContext } from 'contexts/DashboardContext';

const { Title, Text } = Typography;

const baseRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '80px 1fr 1fr',
  alignItems: 'center',
  columnGap: 16,
  borderRadius: 16,
  border: '1px solid #e2e8f0',
  padding: '12px 16px',
  boxShadow: '0 8px 18px rgba(15,23,42,0.08)',
};

const DashboardPredictions: React.FC = () => {
  const { predictions } = useDashboardContext();
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 32,
        border: '1px solid #dbeafe',
        boxShadow: '0 25px 45px rgba(15,23,42,0.12)',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      }}
    >
      <Title level={5} style={{ marginBottom: 4, color: '#1e293b' }}>
        AI Predictions - Next 2 Hours
      </Title>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Occupancy forecast with availability counts
      </Text>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {predictions.map((prediction, idx) => (
          <div
            key={prediction.time}
            style={{
              ...baseRowStyle,
              backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f1f5f9',
            }}
          >
            <Text strong style={{ color: '#1e293b' }}>
              {prediction.time}
            </Text>
            <div style={{ color: '#dc2626', fontWeight: 600 }}>
              {prediction.occupied} occupied ({prediction.occupancyPercent.toFixed(1)}%)
            </div>
            <div style={{ color: '#059669', fontWeight: 600, textAlign: 'right' }}>
              {prediction.available} available
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DashboardPredictions;
