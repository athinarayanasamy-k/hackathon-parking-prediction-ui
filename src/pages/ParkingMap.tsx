import React from 'react';
import { Alert, Spin } from 'antd';
import { skipToken } from '@reduxjs/toolkit/query';
import ParkingMapZones from 'features/ParkingMap/ParkingMapZones';
import ParkingPredictionPanel from 'features/ParkingMap/ParkingPredictionPanel';
import ParkingMapLayout from 'layouts/ParkingMapLayout';
import { ParkingMapProvider } from 'contexts/ParkingMapContext';
import { useGetParkingMapQuery, type ParkingMapResponse, type ParkingSlotStatus } from 'services/parkingMapApi';
import { useGetDashboardQuery, type DashboardResponse, type DashboardZoneSlot } from 'services/dashboardApi';
import { useAppSelector } from 'store/hooks';
import { selectDashboardLocation } from 'features/dashboardLocation/dashboardLocationSlice';

const deriveSlotStatusFromDashboard = (slot: DashboardZoneSlot): ParkingSlotStatus => {
  if (slot.reserved) return 'reserved';
  if (slot.occupied) return 'occupied';
  return 'available';
};

const buildParkingMapFromDashboard = (dashboard: DashboardResponse): ParkingMapResponse => {
  const zones = dashboard.zones.map((zone) => {
    const slots = zone.slots.map((slot, index) => {
      const status = deriveSlotStatusFromDashboard(slot);
      const slotNumber = slot.slot_number ?? `${zone.code}${(index + 1).toString().padStart(2, '0')}`;
      return {
        id: `${zone.code}-${slotNumber}`,
        status,
        reservedByUserId: slot.reserved ? `user-${(index % 3) + 1}` : undefined,
        parking_lot_id: slot.parking_slot_id ? Math.floor(slot.parking_slot_id / 100) || 1 : 1,
        parking_slot_id: slot.parking_slot_id ?? index + 1,
        slot_number: slotNumber,
        reservation_id: slot.reservation_id,
        employee_number: slot.employee_number,
        available: slot.available ?? status === 'available',
        reserved: slot.reserved ?? status === 'reserved',
        occupied: slot.occupied ?? status === 'occupied',
      };
    });

    return {
      id: zone.id,
      label: zone.label,
      totalSlots: zone.totalSlots,
      slots,
    };
  });

  const predictionSummary = {
    predictedOccupancyPercent: Math.round(dashboard.summary.utilisationRate),
    available: dashboard.summary.availableSpots,
    occupied: dashboard.summary.occupiedSpots,
  };

  const forecast = dashboard.predictions.map((p) => ({
    time: p.time,
    occupancyPercent: Math.round(p.occupancyPercent),
  }));

  return { zones, predictionSummary, forecast };
};

const ParkingMapPage: React.FC = () => {
  const { dcId } = useAppSelector(selectDashboardLocation);

  const {
    data: dashboardData,
    isFetching: isDashboardFetching,
    isError: isDashboardError,
    error: dashboardError,
  } = useGetDashboardQuery(dcId ? dcId : skipToken);

  const {
    data: parkingMapData,
    isLoading: isParkingMapLoading,
    isError: isParkingMapError,
    error: parkingMapError,
  } = useGetParkingMapQuery(undefined, { skip: Boolean(dashboardData) });

  const data = dashboardData ? buildParkingMapFromDashboard(dashboardData) : parkingMapData;
  const isLoading = (!data && isDashboardFetching) || (!dashboardData && isParkingMapLoading);
  const hasError = !data && ((isDashboardError && !dashboardData) || isParkingMapError);
  const error = dashboardError ?? parkingMapError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="p-6">
        <Alert
          type="error"
          message="Failed to load parking map"
          description={JSON.stringify(error)}
          showIcon
        />
      </div>
    );
  }

  if (!data) return null;

  return (
    <ParkingMapProvider parkingMap={data}>
      <ParkingMapLayout>
        <ParkingMapZones />
        <ParkingPredictionPanel />
      </ParkingMapLayout>
    </ParkingMapProvider>
  );
};

export default ParkingMapPage;
