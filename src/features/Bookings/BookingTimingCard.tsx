
import React from 'react';
import { Typography } from 'antd';
import BookingsSectionCard from './BookingsSectionCard';
import { useBookingsContext } from 'contexts/BookingsContext';

const { Text } = Typography;

const BookingTimingCard: React.FC = () => {
  const { timing } = useBookingsContext();

  const rows = [
    { label: 'Date and Time', value: timing.bookingDateTime },
    { label: 'Expected Arrival', value: timing.expectedArrival },
    { label: 'Expected Exit', value: timing.expectedExit },
    { label: 'Duration of Stay', value: timing.duration },
  ];

  return (
    <BookingsSectionCard title="Timing Details" description="Planned visit timeline">
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between text-sm gap-4">
            <Text type="secondary">{row.label}</Text>
            <Text strong className="text-right">
              {row.value}
            </Text>
          </div>
        ))}
      </div>
    </BookingsSectionCard>
  );
};

export default BookingTimingCard;
