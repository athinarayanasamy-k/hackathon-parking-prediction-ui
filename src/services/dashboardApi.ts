import { baseApi } from './baseApi';
import { getMockDashboardResponse } from 'assets/mockResponseData';

export interface DashboardSummary {
  availableSpots: number;
  occupiedSpots: number;
  predictedAvailableIn30Min: number;
  utilisationRate: number;
  timestamp: string;
  dateLabel: string;
}

export type SlotStatus = 'available' | 'occupied' | 'reserved';

export interface DashboardZoneSlot {
  parking_slot_id: number;
  zone: string;
  slot_number: string;
  reservation_id?: number;
  employee_number?: number;
  available: boolean;
  reserved: boolean;
  occupied: boolean;
}

export interface DashboardZoneDetail {
  id: string;
  label: string;
  code: string;
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  reservedSlots: number;
  slots: DashboardZoneSlot[];
}

export interface DashboardPredictionEntry {
  time: string;
  occupied: number;
  available: number;
  occupancyPercent: number;
}

export type DashboardAlertSeverity = 'critical' | 'warning' | 'info' | 'success';

export interface DashboardAlert {
  id: string;
  title: string;
  message: string;
  severity: DashboardAlertSeverity;
  timeAgo: string;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  zones: DashboardZoneDetail[];
  predictions: DashboardPredictionEntry[];
  alerts: DashboardAlert[];
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<DashboardResponse, string>({
      async queryFn(dcId, _api, _extraOptions, fetchWithBQ) {
        const result = await fetchWithBQ(`/dashboard/${dcId}`);

        if (result.error) {
          return { data: getMockDashboardResponse(dcId) };
        }

        const data =
          (result.data as DashboardResponse | undefined) ?? getMockDashboardResponse(dcId);
        return { data };
      },
      providesTags: (_result, _error, dcId) => [{ type: 'Dashboard', id: dcId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardQuery } = dashboardApi;
