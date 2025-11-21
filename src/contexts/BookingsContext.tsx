import React from 'react';
import type {
  BookingsResponse,
  BookingHeader,
  BookingSummary,
  BookingTimingDetails,
  BookingSlotDetails,
  BookingOccupancyDetails,
} from 'services/bookingsApi';

interface BookingsContextValue {
  booking: BookingsResponse;
  header: BookingHeader;
  summary: BookingSummary;
  timing: BookingTimingDetails;
  slot: BookingSlotDetails;
  occupancy: BookingOccupancyDetails;
}

const BookingsContext = React.createContext<BookingsContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useBookingsContext = () => {
  const context = React.useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookingsContext must be used within a BookingsProvider');
  }
  return context;
};

interface BookingsProviderProps {
  booking: BookingsResponse;
  children?: React.ReactNode;
}

export const BookingsProvider: React.FC<BookingsProviderProps> = ({ booking, children }) => {
  const value = React.useMemo(
    () => ({
      booking,
      header: booking.header,
      summary: booking.summary,
      timing: booking.timing,
      slot: booking.slot,
      occupancy: booking.occupancy,
    }),
    [booking],
  );

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
};
