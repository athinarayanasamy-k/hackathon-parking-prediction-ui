// src/contexts/OverviewContext.tsx
import React from 'react';
import type { OverviewResponse, DcOverview } from 'services/parkingApi';

interface OverviewContextValue {
  overview: OverviewResponse;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedDc: string;
  setSelectedDc: (dc: string) => void;
  filteredDcs: DcOverview[];
  filteredSummary: OverviewResponse['summary'];
  cityOptions: { id: string; name: string }[];
}

const OverviewContext = React.createContext<OverviewContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useOverviewContext = () => {
  const ctx = React.useContext(OverviewContext);
  if (!ctx) throw new Error('useOverviewContext must be used within OverviewProvider');
  return ctx;
};

interface OverviewProviderProps {
  overview: OverviewResponse;
  children?: React.ReactNode;
}

export const OverviewProvider: React.FC<OverviewProviderProps> = ({ overview, children }) => {
  const [selectedCity, setSelectedCity] = React.useState<string>('all');
  const [selectedDc, setSelectedDc] = React.useState<string>('all');

  const cityOptions = React.useMemo(() => overview.cities ?? [], [overview]);

  const filteredDcs = React.useMemo(() => {
    let dcs = overview.dcs;
    if (selectedCity !== 'all') {
      dcs = dcs.filter((dc) => dc.cityId === selectedCity);
    }
    if (selectedDc !== 'all') {
      dcs = dcs.filter((dc) => dc.id === selectedDc);
    }
    return dcs;
  }, [overview, selectedCity, selectedDc]);

  const filteredSummary = React.useMemo(() => {
    const dcs = filteredDcs;
    if (!dcs || dcs.length === 0) return overview.summary;
    const totalDcs = dcs.length;
    const totalSlots = dcs.reduce((sum, dc) => sum + dc.totalSlots, 0);
    const totalOccupied = dcs.reduce((sum, dc) => sum + dc.occupiedSlots, 0);
    const totalAvailable = dcs.reduce((sum, dc) => sum + dc.availableSlots, 0);
    const averageUtilisationPercent = totalSlots > 0 ? (totalOccupied / totalSlots) * 100 : 0;
    return {
      totalDcs,
      totalSlots,
      totalOccupied,
      totalAvailable,
      averageUtilisationPercent: Math.round(averageUtilisationPercent * 10) / 10,
    };
  }, [overview, filteredDcs]);

  const value = React.useMemo(
    () => ({
      overview,
      selectedCity,
      setSelectedCity,
      selectedDc,
      setSelectedDc,
      filteredDcs,
      filteredSummary,
      cityOptions,
    }),
    [overview, selectedCity, selectedDc, filteredDcs, filteredSummary, cityOptions],
  );

  return <OverviewContext.Provider value={value}>{children}</OverviewContext.Provider>;
};
