
import React from 'react';
import { Tooltip, Typography } from 'antd';
import BookingsSectionCard from './BookingsSectionCard';
import { useBookingsContext } from 'contexts/BookingsContext';
import { SLOT_STATUS_COLORS, SLOT_STATUS_LABELS } from 'constants/ApiConstants';

const { Text } = Typography;

const BookingSlotDetailsCard: React.FC = () => {
  const { slot } = useBookingsContext();
  const slotStatus: keyof typeof SLOT_STATUS_LABELS = slot.reserved
    ? 'reserved'
    : slot.occupied
      ? 'occupied'
      : 'available';
  const slotLabel = SLOT_STATUS_LABELS[slotStatus] ?? slotStatus;
  const slotColor = SLOT_STATUS_COLORS[slotStatus as keyof typeof SLOT_STATUS_COLORS] ?? '#94a3b8';

  const reservationTooltip = slot.reserved ? (
    <div className="space-y-1 text-sm">
      <div className="flex justify-between gap-8">
        <span className="text-gray-500">Reservation ID</span>
        <span className="font-semibold">{slot.reservation_id ?? 'N/A'}</span>
      </div>
      <div className="flex justify-between gap-8">
        <span className="text-gray-500">Employee #</span>
        <span className="font-semibold">{slot.employee_number ?? 'N/A'}</span>
      </div>
    </div>
  ) : null;

  return (
    <BookingsSectionCard title="Parking Slot Details" description="Assigned slot information">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <Text type="secondary">Slot Number</Text>
          <Text strong>{slot.slot_number}</Text>
        </div>
        <div className="flex items-center justify-between text-sm">
          <Text type="secondary">Zone</Text>
          <Text strong className="text-right">
            {slot.zone}
          </Text>
        </div>
      </div>
      <div className="pt-2">
        <Text type="secondary" className="block text-xs uppercase tracking-wide mb-1">
          Slot Status
        </Text>
        <Tooltip title={reservationTooltip} open={slot.reserved ? undefined : false}>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
            style={{
              backgroundColor: `${slotColor}20`,
              color: slot.reserved ? '#92400e' : slotColor,
            }}
          >
            {slotLabel}
          </span>
        </Tooltip>
      </div>
    </BookingsSectionCard>
  );
};

export default BookingSlotDetailsCard;
