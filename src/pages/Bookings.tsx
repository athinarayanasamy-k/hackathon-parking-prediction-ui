import React from 'react';
import { Alert, Spin } from 'antd';
import { useGetBookingDetailsQuery } from 'services/bookingsApi';
import { BookingsProvider } from 'contexts/BookingsContext';
import BookingsLayout from 'layouts/BookingsLayout';
import BookingSummaryCard from 'features/Bookings/BookingSummaryCard';
import BookingTimingCard from 'features/Bookings/BookingTimingCard';
import BookingSlotDetailsCard from 'features/Bookings/BookingSlotDetailsCard';
import BookingOccupancyCard from 'features/Bookings/BookingOccupancyCard';

const BookingsPage: React.FC = () => {
  const { data, isLoading, isError, error } = useGetBookingDetailsQuery();
  const booking = data;

  if (isLoading && !booking) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (isError && !booking) {
    return (
      <div className="p-6">
        <Alert
          type="error"
          message="Failed to load bookings"
          description={JSON.stringify(error)}
          showIcon
        />
      </div>
    );
  }

  if (!booking) return null;

  return (
    <BookingsProvider booking={booking}>
      <BookingsLayout>
        <BookingSummaryCard />
        <BookingTimingCard />
        <BookingSlotDetailsCard />
        <BookingOccupancyCard />
      </BookingsLayout>
    </BookingsProvider>
  );
};

export default BookingsPage;
