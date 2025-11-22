import React from 'react';
import { Tag, Typography } from 'antd';
import BookingsSectionCard from './BookingsSectionCard';
import { useBookingsContext } from 'contexts/BookingsContext';

const { Text } = Typography;

const statusMeta = {
  confirmed: { label: 'Confirmed', color: 'green' as const },
  pending: { label: 'Pending', color: 'orange' as const },
  completed: { label: 'Completed', color: 'blue' as const },
  cancelled: { label: 'Cancelled', color: 'red' as const },
};

const BookingSummaryCard: React.FC = () => {
  const { summary } = useBookingsContext();
  const status = statusMeta[summary.bookingStatus] ?? statusMeta.confirmed;

  const rows = [
    { label: 'Booking ID', value: summary.bookingId },
    { label: 'Vehicle Type', value: summary.vehicleType },
    { label: 'User Name', value: summary.userName },
  ];

  return (
    <BookingsSectionCard title="Booking Summary" description="Key reservation metadata">
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm gap-4">
            <Text type="secondary">{row.label}</Text>
            <Text strong className="text-right">
              {row.value}
            </Text>
          </div>
        ))}
      </div>
      <div className="pt-2">
        <Text type="secondary" className="block text-xs uppercase tracking-wide mb-1">
          Booking Status
        </Text>
        <Tag color={status.color} className="px-3 py-1 text-sm">
          {status.label}
        </Tag>
      </div>
    </BookingsSectionCard>
  );
};

export default BookingSummaryCard;
