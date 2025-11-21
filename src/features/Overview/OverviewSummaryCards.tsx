// src/features/overview/OverviewSummaryCards.tsx
import { Card, Col, Row, Typography } from 'antd';
import { useOverviewContext } from 'contexts/OverviewContext';

const { Text, Title } = Typography;

const cardClass =
  'h-full flex flex-col justify-between bg-white rounded-2xl shadow-sm border border-gray-100';

export const OverviewSummaryCards: React.FC = () => {
  const { filteredSummary } = useOverviewContext();
  const summary = filteredSummary;
  const items = [
    {
      label: 'Total DCs',
      value: summary.totalDcs,
      subtitle: 'Campus locations monitored',
    },
    {
      label: 'Total Slots',
      value: summary.totalSlots,
      subtitle: 'Across all DCs',
    },
    {
      label: 'Available Now',
      value: summary.totalAvailable,
      subtitle: 'Free slots at this moment',
    },
    {
      label: 'Avg. Utilisation',
      value: `${summary.averageUtilisationPercent.toFixed(1)}%`,
      subtitle: 'Today so far',
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col key={item.label} xs={12} md={6}>
          <Card className={cardClass} bordered={false}>
            <Text type="secondary">{item.label}</Text>
            <Title level={3} className="!mt-1 !mb-1">
              {item.value}
            </Title>
            <Text type="secondary" className="text-xs">
              {item.subtitle}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
