
import React from 'react';
import { Progress, Typography } from 'antd';
import BookingsSectionCard from './BookingsSectionCard';
import { useBookingsContext } from 'contexts/BookingsContext';

const { Text } = Typography;

const BookingOccupancyCard: React.FC = () => {
  const { occupancy, timing } = useBookingsContext();

  const rows = [
    {
      label: 'Current',
      value: occupancy.current,
    },
    {
      label: `At Arrival (${timing.expectedArrival})`,
      value: occupancy.atArrival,
    },
    {
      label: `At Exit (${timing.expectedExit})`,
      value: occupancy.atExit,
    },
  ];

  return (
    <BookingsSectionCard title="Predicted Occupancy Details" description="AI forecast around the reservation window">
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-sm mb-1">
              <Text type="secondary">{row.label}</Text>
              <Text strong>{row.value}%</Text>
            </div>
            <Progress
              percent={row.value}
              showInfo={false}
              strokeColor={{ from: '#4f46e5', to: '#22d3ee' }}
              trailColor="#e2e8f0"
            />
          </div>
        ))}
      </div>
    </BookingsSectionCard>
  );
};

export default BookingOccupancyCard;
