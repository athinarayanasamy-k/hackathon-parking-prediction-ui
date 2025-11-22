// src/features/Overview/OverviewFilters.tsx
import React from 'react';
import DropdownSelect from 'components/DropdownSelect';
import type { DropdownSelectOption } from 'components/DropdownSelect';
import { type OverviewResponse } from 'services/parkingApi';

interface OverviewFiltersProps {
  overview: OverviewResponse;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedDc: string;
  setSelectedDc: (dc: string) => void;
}

const OverviewFilters: React.FC<OverviewFiltersProps> = ({
  overview,
  selectedCity,
  setSelectedCity,
  setSelectedDc,
}) => {
  // City options
  const cityOptions: DropdownSelectOption[] = (overview.cities || []).map((city) => ({
    value: city.id,
    label: city.name,
  }));

  // DC options filtered by city
  const dcOptions: DropdownSelectOption[] = React.useMemo(() => {
    let dcs = overview.dcs;
    if (selectedCity !== 'all') {
      dcs = dcs.filter((dc) => dc.cityId === selectedCity);
    }
    return [{ value: 'all', label: 'All' }, ...dcs.map((dc) => ({ value: dc.id, label: dc.name }))];
  }, [overview, selectedCity]);

  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
      <DropdownSelect
        style={{ minWidth: 160 }}
        // value={selectedCity}
        onChange={(val) => {
          setSelectedCity(val);
          setSelectedDc('all'); // Reset DC when city changes
        }}
        options={cityOptions}
        placeholder="Select City"
      />
      <DropdownSelect
        style={{ minWidth: 200 }}
        // value={selectedDc}
        onChange={setSelectedDc}
        options={dcOptions}
        placeholder="Select DC"
      />
    </div>
  );
};

export default OverviewFilters;
