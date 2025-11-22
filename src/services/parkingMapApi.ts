import { baseApi } from './baseApi';
import { mockParkingMapResponse, mockParkingReservationResponse } from 'assets/mockResponseData';

export type ParkingSlotStatus = 'available' | 'occupied' | 'reserved';

export interface ParkingSlot {
  id: string;
  status: ParkingSlotStatus;
  reservedByUserId?: string | null;
  parking_lot_id?: number;
  parking_slot_id?: number;
  slot_number?: string;
  reservation_id?: number | null;
  employee_number?: number | null;
  available?: boolean;
  reserved?: boolean;
  occupied?: boolean;
}

export interface ParkingZone {
  id: string;
  label: string;
  totalSlots: number;
  slots: ParkingSlot[];
}

export interface ParkingPredictionSummary {
  predictedOccupancyPercent: number;
  available: number;
  occupied: number;
}

export interface ParkingForecastEntry {
  time: string;
  occupancyPercent: number;
}

export interface ParkingMapResponse {
  zones: ParkingZone[];
  predictionSummary: ParkingPredictionSummary;
  forecast: ParkingForecastEntry[];
}

export interface ParkingReservationRequest {
  employee_number: number;
  parking_lot_id: number;
  parking_slot_id: number;
  reserved_from: string;
  reserved_to: string;
}

export interface ParkingReservationResponse extends ParkingReservationRequest {
  message: string;
  reservation_id: number;
  status: string;
}

export const parkingMapApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getParkingMap: build.query<ParkingMapResponse, void>({
      query: () => '/parkingMap',
      providesTags: ['ParkingMap'],
      transformResponse: (response: ParkingMapResponse | undefined) =>
        response ?? mockParkingMapResponse,
    }),
    reserveParkingSlot: build.mutation<ParkingReservationResponse, ParkingReservationRequest>({
      query: (body) => ({
        url: '/reservations',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ParkingReservationResponse | undefined) =>
        response ?? { ...mockParkingReservationResponse, ...body },
    }),
  }),
  overrideExisting: false,
});

export const { useGetParkingMapQuery, useReserveParkingSlotMutation } = parkingMapApi;
