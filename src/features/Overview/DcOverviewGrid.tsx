// src/features/overview/DcOverviewGrid.tsx
import { Card, Col, Progress, Row, Space, Typography } from 'antd';
import type { DcOverview } from '../../services/parkingApi';

const { Text, Title } = Typography;

interface DcOverviewGridProps {
  dcs: DcOverview[];
}

export const DcOverviewGrid: React.FC<DcOverviewGridProps> = ({ dcs }) => {
  return (
    <div className="mt-4">
      <Title level={5} className="!mb-3">
        DC-wise utilisation today
      </Title>
      <Row gutter={[16, 16]}>
        {dcs.map((dc) => (
          <Col key={dc.id} xs={24} md={12} xl={8}>
            <Card bordered={false} className="rounded-2xl shadow-sm border border-gray-100 h-full">
              <Space direction="vertical" className="w-full">
                <Text strong>{dc.name}</Text>
                <div className="flex items-center justify-between">
                  <div>
                    <Text type="secondary" className="block text-xs">
                      Total slots
                    </Text>
                    <Text strong>{dc.totalSlots}</Text>
                  </div>
                  <div>
                    <Text type="secondary" className="block text-xs">
                      Available
                    </Text>
                    <Text strong className="text-emerald-600">
                      {dc.availableSlots}
                    </Text>
                  </div>
                  <div>
                    <Text type="secondary" className="block text-xs">
                      Occupied
                    </Text>
                    <Text strong className="text-red-500">
                      {dc.occupiedSlots}
                    </Text>
                  </div>
                </div>

                <div className="mt-3">
                  <Text type="secondary" className="block text-xs mb-1">
                    Utilisation
                  </Text>
                  <Progress percent={dc.utilisationPercent} status="active" size="small" />
                </div>

                <Text type="secondary" className="text-xs mt-2">
                  Est. time to fill:{' '}
                  <Text strong>{Math.round(dc.predictedFillTimeMinutes)} mins</Text>
                </Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
