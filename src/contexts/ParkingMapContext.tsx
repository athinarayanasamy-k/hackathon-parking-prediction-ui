import React from 'react';
import type {
  ParkingForecastEntry,
  ParkingMapResponse,
  ParkingPredictionSummary,
  ParkingZone,
  ParkingSlot,
} from 'services/parkingMapApi';

interface ParkingMapContextValue {
  parkingMap: ParkingMapResponse;
  zones: ParkingZone[];
  predictionSummary: ParkingPredictionSummary;
  forecast: ParkingForecastEntry[];
}

const ParkingMapContext = React.createContext<ParkingMapContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useParkingMapContext = () => {
  const context = React.useContext(ParkingMapContext);
  if (!context) {
    throw new Error('useParkingMapContext must be used within a ParkingMapProvider');
  }
  return context;
};

interface ParkingMapProviderProps {
  parkingMap: ParkingMapResponse;
  children?: React.ReactNode;
}

export const ParkingMapProvider: React.FC<ParkingMapProviderProps> = ({ parkingMap, children }) => {
  const normalizedZones = React.useMemo(
    () =>
      parkingMap.zones.map((zone) => ({
        ...zone,
        slots: zone.slots.map((slot) => normalizeSlotOwner(slot)),
      })),
    [parkingMap],
  );

  const normalizedMap = React.useMemo(
    () => ({
      ...parkingMap,
      zones: normalizedZones,
    }),
    [parkingMap, normalizedZones],
  );

  const value = React.useMemo(
    () => ({
      parkingMap: normalizedMap,
      zones: normalizedZones,
      predictionSummary: normalizedMap.predictionSummary,
      forecast: normalizedMap.forecast,
    }),
    [normalizedMap, normalizedZones],
  );

  return <ParkingMapContext.Provider value={value}>{children}</ParkingMapContext.Provider>;
};

const DEFAULT_RESERVED_OWNER = 'system-user';

const normalizeSlotOwner = (slot: ParkingSlot): ParkingSlot => {
  if (slot.status !== 'reserved') {
    return { ...slot, reservedByUserId: undefined };
  }
  if (slot.reservedByUserId) {
    return slot;
  }
  return {
    ...slot,
    reservedByUserId: DEFAULT_RESERVED_OWNER,
  };
};
