export interface DashboardLocationGroup {
  cityId: string;
  cityName: string;
  dcs: { id: string; name: string }[];
}

export const DASHBOARD_LOCATIONS: DashboardLocationGroup[] = [
  {
    cityId: 'chennai',
    cityName: 'Chennai',
    dcs: [
      { id: 'dc1', name: 'DC 1 - Mahindra City' },
      { id: 'dc2', name: 'DC 2 - Tidel' },
      { id: 'dc3', name: 'DC 3 - Siruseri' },
    ],
  },
  {
    cityId: 'bangalore',
    cityName: 'Bangalore',
    dcs: [
      { id: 'dc4', name: 'DC 4 - Whitefield' },
      { id: 'dc5', name: 'DC 5 - Electronic City' },
    ],
  },
];

export const DEFAULT_DASHBOARD_DC_ID = DASHBOARD_LOCATIONS[0].dcs[0].id;

