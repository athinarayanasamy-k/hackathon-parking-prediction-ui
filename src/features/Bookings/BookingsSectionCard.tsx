import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

interface BookingsSectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const BookingsSectionCard: React.FC<BookingsSectionCardProps> = ({ title, description, children }) => (
  <Card bordered={false} className="rounded-2xl shadow-sm border border-gray-100 h-full">
    <div className="mb-4">
      <Title level={5} className="!mb-1">
        {title}
      </Title>
      {description && (
        <Text type="secondary" className="text-xs">
          {description}
        </Text>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </Card>
);

export default BookingsSectionCard;
