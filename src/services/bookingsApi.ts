import { baseApi } from './baseApi';
import { mockBookingsResponse } from 'assets/mockResponseData';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingHeader {
  timestamp: string;
  dateLabel: string;
}

export interface BookingSummary {
  bookingId: string;
  vehicleType: string;
  userName: string;
  bookingStatus: BookingStatus;
}

export interface BookingTimingDetails {
  bookingDateTime: string;
  expectedArrival: string;
  expectedExit: string;
  duration: string;
}

export interface BookingSlotDetails {
  slotNumber: string;
  zone: string;
  slotStatus: 'available' | 'occupied' | 'reserved';
}

export interface BookingOccupancyDetails {
  current: number;
  atArrival: number;
  atExit: number;
}

export interface BookingsResponse {
  header: BookingHeader;
  summary: BookingSummary;
  timing: BookingTimingDetails;
  slot: BookingSlotDetails;
  occupancy: BookingOccupancyDetails;
}

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBookingDetails: build.query<BookingsResponse, void>({
      query: () => '/bookings',
      providesTags: ['Bookings'],
      transformResponse: (response: BookingsResponse | undefined) => response ?? mockBookingsResponse,
    }),
  }),
  overrideExisting: false,
});

export const { useGetBookingDetailsQuery } = bookingsApi;

