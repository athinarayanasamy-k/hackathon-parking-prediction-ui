import { skipToken } from '@reduxjs/toolkit/query';
import React from 'react';
import { Alert, Spin } from 'antd';
import DashboardLayout from 'layouts/DashboardLayout';
import DashboardSummaryCards from 'features/Dashboard/DashboardSummaryCards';
import DashboardZoneOverview from 'features/Dashboard/DashboardZoneOverview';
import DashboardAvailabilityChart from 'features/Dashboard/DashboardAvailabilityChart';
import DashboardPredictions from 'features/Dashboard/DashboardPredictions';
import DashboardAlerts from 'features/Dashboard/DashboardAlerts';
import DashboardLocationModal from 'features/Dashboard/DashboardLocationModal';
import { DashboardProvider } from 'contexts/DashboardContext';
import { useGetDashboardQuery } from 'services/dashboardApi';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  selectDashboardLocation,
  setDashboardLocation,
} from 'features/dashboardLocation/dashboardLocationSlice';
import { DASHBOARD_LOCATIONS } from 'constants/DashboardLocations';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cityId, dcId } = useAppSelector(selectDashboardLocation);
  const [isLocationModalOpen, setIsLocationModalOpen] = React.useState(!dcId);

  const selectedCity = React.useMemo(
    () => DASHBOARD_LOCATIONS.find((city) => city.cityId === cityId),
    [cityId],
  );
  const selectedDc = React.useMemo(
    () => selectedCity?.dcs.find((dc) => dc.id === dcId),
    [selectedCity, dcId],
  );
  const locationLabel =
    selectedCity && selectedDc ? `${selectedCity.cityName} • ${selectedDc.name}` : undefined;

  React.useEffect(() => {
    if (!dcId) {
      setIsLocationModalOpen(true);
    }
  }, [dcId]);

  const handleLocationSubmit = (payload: { cityId: string; dcId: string }) => {
    dispatch(setDashboardLocation(payload));
    setIsLocationModalOpen(false);
  };

  const handleLocationCancel = () => {
    if (!dcId) return;
    setIsLocationModalOpen(false);
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetDashboardQuery(dcId ? dcId : skipToken);
  const dashboard = data;

  if (!dcId) {
    return (
      <>
        <DashboardLocationModal
          open={isLocationModalOpen}
          onSubmit={handleLocationSubmit}
          onCancel={handleLocationCancel}
          initialCityId={cityId}
          initialDcId={dcId}
          allowDismiss={Boolean(dcId)}
        />
        <div className="flex items-center justify-center h-full">
          <Alert
            type="info"
            message="Select a location"
            description="Choose a city and data centre to load dashboard insights."
            showIcon
          />
        </div>
      </>
    );
  }

  if (isLoading && !dashboard) {
    return (
      <>
        <DashboardLocationModal
          open={isLocationModalOpen}
          onSubmit={handleLocationSubmit}
          onCancel={handleLocationCancel}
          initialCityId={cityId}
          initialDcId={dcId}
          allowDismiss
        />
        <div className="flex items-center justify-center h-full">
          <Spin size="large" />
        </div>
      </>
    );
  }

  if (isError && !dashboard) {
    return (
      <>
        <DashboardLocationModal
          open={isLocationModalOpen}
          onSubmit={handleLocationSubmit}
          onCancel={handleLocationCancel}
          initialCityId={cityId}
          initialDcId={dcId}
          allowDismiss
        />
        <div className="p-6">
          <Alert
            type="error"
            message="Failed to load dashboard"
            description={JSON.stringify(error)}
            showIcon
          />
        </div>
      </>
    );
  }

  if (!dashboard) return null;

  return (
    <>
      <DashboardLocationModal
        open={isLocationModalOpen}
        onSubmit={handleLocationSubmit}
        onCancel={handleLocationCancel}
        initialCityId={cityId}
        initialDcId={dcId}
        allowDismiss
      />
      <DashboardProvider dashboard={dashboard}>
        <DashboardLayout
          locationLabel={locationLabel}
          onChangeLocation={() => setIsLocationModalOpen(true)}
        >
          <DashboardSummaryCards />
          <DashboardZoneOverview />
          <DashboardAvailabilityChart />
          <DashboardAlerts />
          <DashboardPredictions />
        </DashboardLayout>
      </DashboardProvider>
      {isFetching && (
        <div className="fixed inset-0 pointer-events-none flex items-start justify-end p-4">
          <Spin size="small" />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
