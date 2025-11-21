import React from 'react';
import { Col, Row, Typography } from 'antd';
import { useParkingMapContext } from 'contexts/ParkingMapContext';

const { Text } = Typography;

interface ParkingMapLayoutProps {
  children?: React.ReactNode[];
}

const ParkingMapLayout: React.FC<ParkingMapLayoutProps> = ({ children = [] }) => {
  const { predictionSummary } = useParkingMapContext();
  const [zonesSection, predictionPanel] = children;

  return (
    <div className="px-6 py-4 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Text type="secondary" className="text-xs">
            Manage live slot availability and occupancy prediction
          </Text>
        </div>
        {predictionSummary && (
          <div className="text-right">
            <Text className="text-indigo-600 font-semibold block">
              {predictionSummary.predictedOccupancyPercent}% predicted occupancy
            </Text>
            <Text type="secondary" className="text-xs">
              {predictionSummary.available} available | {predictionSummary.occupied} occupied
            </Text>
          </div>
        )}
      </div>

      <Row gutter={[24, 24]} align="stretch">
        <Col xs={24} xl={16}>
          {zonesSection}
        </Col>
        <Col xs={24} xl={8}>
          {predictionPanel}
        </Col>
      </Row>
    </div>
  );
};

export default ParkingMapLayout;
