import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';

export interface DashboardLocationState {
  cityId: string | null;
  dcId: string | null;
}

const initialState: DashboardLocationState = {
  cityId: null,
  dcId: null,
};

const dashboardLocationSlice = createSlice({
  name: 'dashboardLocation',
  initialState,
  reducers: {
    setDashboardLocation: (state, action: PayloadAction<DashboardLocationState>) => {
      state.cityId = action.payload.cityId;
      state.dcId = action.payload.dcId;
    },
    clearDashboardLocation: (state) => {
      state.cityId = null;
      state.dcId = null;
    },
  },
});

export const { setDashboardLocation, clearDashboardLocation } = dashboardLocationSlice.actions;

export const selectDashboardLocation = (state: RootState) => state.dashboardLocation;

export default dashboardLocationSlice.reducer;
