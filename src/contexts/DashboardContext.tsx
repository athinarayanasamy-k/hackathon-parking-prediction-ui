
import React from 'react';
import type {
  DashboardResponse,
  DashboardSummary,
  DashboardZoneDetail,
  DashboardPredictionEntry,
  DashboardAlert,
} from 'services/dashboardApi';

interface DashboardContextValue {
  dashboard: DashboardResponse;
  summary: DashboardSummary;
  zones: DashboardZoneDetail[];
  predictions: DashboardPredictionEntry[];
  alerts: DashboardAlert[];
}

const DashboardContext = React.createContext<DashboardContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  dashboard: DashboardResponse;
  children?: React.ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ dashboard, children }) => {
  const value = React.useMemo(
    () => ({
      dashboard,
      summary: dashboard.summary,
      zones: dashboard.zones,
      predictions: dashboard.predictions,
      alerts: dashboard.alerts,
    }),
    [dashboard],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
