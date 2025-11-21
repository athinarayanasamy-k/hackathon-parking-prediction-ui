import React from 'react';
import { Col, Row } from 'antd';
import StatCard from 'components/common/StatCard';
import { ICON_COLORS } from 'constants/Icons';
import { useDashboardContext } from 'contexts/DashboardContext';

const DashboardSummaryCards: React.FC = () => {
  const { summary } = useDashboardContext();

  const cards = [
    {
      key: 'available',
      label: 'Available Spots',
      value: summary.availableSpots,
      icon: 'map',
      iconColor: ICON_COLORS.SUCCESS,
      bgColor: 'bg-emerald-50',
      subtitle: 'Across monitored zones',
    },
    {
      key: 'occupied',
      label: 'Occupied Spots',
      value: summary.occupiedSpots,
      icon: 'home',
      iconColor: ICON_COLORS.ERROR,
      bgColor: 'bg-red-50',
      subtitle: 'Currently in use',
    },
    {
      key: 'predicted',
      label: 'Predicted in 30 min',
      value: summary.predictedAvailableIn30Min,
      icon: 'calendar',
      iconColor: ICON_COLORS.WARNING,
      bgColor: 'bg-amber-50',
      subtitle: 'Expected available',
    },
    {
      key: 'utilisation',
      label: 'Utilisation Rate',
      value: `${summary.utilisationRate.toFixed(1)}%`,
      icon: 'bar-chart',
      iconColor: ICON_COLORS.PRIMARY,
      bgColor: 'bg-indigo-50',
      subtitle: 'Live occupancy trend',
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {cards.map((card) => (
        <Col key={card.key} xs={12} md={6}>
          <StatCard
            label={card.label}
            value={card.value}
            icon={card.icon}
            iconColor={card.iconColor}
            bgColor={card.bgColor}
            subtitle={card.subtitle}
            className="h-full"
          />
        </Col>
      ))}
    </Row>
  );
};

export default DashboardSummaryCards;
