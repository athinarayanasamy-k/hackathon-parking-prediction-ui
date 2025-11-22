// src/services/parkingApi.ts
import { baseApi } from './baseApi';
import { mockOverviewResponse } from 'assets/mockResponseData';

export interface DcOverview {
  id: string;
  name: string;
  cityId: string;
  totalSlots: number;
  occupiedSlots: number;
  availableSlots: number;
  utilisationPercent: number; // 0�100
  predictedFillTimeMinutes: number; // how long until full
}

export interface OverviewSummary {
  totalDcs: number;
  totalSlots: number;
  totalOccupied: number;
  totalAvailable: number;
  averageUtilisationPercent: number;
}

export interface OverviewResponse {
  summary: OverviewSummary;
  dcs: DcOverview[];
  cities: { id: string; name: string }[];
}

export const parkingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOverview: build.query<OverviewResponse, void>({
      // TODO: replace '/overview' with your real backend path
      query: () => '/overview',
      providesTags: ['Overview'],
      // This transform keeps the mock usable if backend isn�t ready yet.
      transformResponse: (response: OverviewResponse | undefined) =>
        response ?? mockOverviewResponse,
    }),
  }),
  overrideExisting: false,
});

export const { useGetOverviewQuery } = parkingApi;
