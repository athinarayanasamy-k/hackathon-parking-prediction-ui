import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { useBookingsContext } from 'contexts/BookingsContext';

const { Title, Text } = Typography;

interface BookingsLayoutProps {
  children?: React.ReactNode[];
}

const BookingsLayout: React.FC<BookingsLayoutProps> = ({ children = [] }) => {
  const { header } = useBookingsContext();
  const [summarySection, timingSection, slotSection, occupancySection] = children;

  return (
    <div className="px-6 py-4 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Text type="secondary" className="text-xs">
            Review reservation details and AI occupancy insights
          </Text>
        </div>
        {header && (
          <div className="text-right">
            <Text className="text-emerald-600 font-semibold block">{header.timestamp}</Text>
            <Text type="secondary" className="text-xs">
              {header.dateLabel}
            </Text>
          </div>
        )}
      </div>

      <Card
        bordered={false}
        className="rounded-2xl shadow-sm border border-gray-100"
        bodyStyle={{ padding: '20px 24px' }}
      >
        <Title level={4} className="!mb-0">
          Booking Details
        </Title>
        <Text type="secondary" className="text-sm">
          Snapshot of reservation, timing, slot allocation, and predicted occupancy
        </Text>
      </Card>

      <Row gutter={[24, 24]} align="stretch">
        <Col xs={24} xl={12}>
          {summarySection}
        </Col>
        <Col xs={24} xl={12}>
          {timingSection}
        </Col>
      </Row>

      <Row gutter={[24, 24]} align="stretch">
        <Col xs={24} xl={12}>
          {slotSection}
        </Col>
        <Col xs={24} xl={12}>
          {occupancySection}
        </Col>
      </Row>
    </div>
  );
};

export default BookingsLayout;
