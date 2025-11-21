// src/assets/mockResponseData.ts
import type { OverviewResponse } from 'services/parkingApi';
import type {
  DashboardAlert,
  DashboardPredictionEntry,
  DashboardResponse,
  DashboardZoneSlot,
  SlotStatus,
} from 'services/dashboardApi';
import type {
  ParkingMapResponse,
  ParkingReservationResponse,
  ParkingSlot,
} from 'services/parkingMapApi';
import type { BookingsResponse } from 'services/bookingsApi';

const buildSlotStatuses = (available: number, occupied: number, reserved: number): SlotStatus[] => [
  ...Array(available).fill('available' as SlotStatus),
  ...Array(occupied).fill('occupied' as SlotStatus),
  ...Array(reserved).fill('reserved' as SlotStatus),
];

const buildParkingSlots = (prefix: string, statuses: SlotStatus[]): ParkingSlot[] => {
  let reservedCounter = 0;
  return statuses.map((status, index) => {
    const slotNumberRaw = (index + 1).toString().padStart(2, '0');
    const slot_number = `${prefix}${slotNumberRaw}`;
    const base: ParkingSlot = {
      id: `${prefix}-${slotNumberRaw}`,
      status,
      parking_lot_id: 1,
      parking_slot_id: index + 1,
      slot_number,
      available: status === 'available',
      reserved: status === 'reserved',
      occupied: status === 'occupied',
    };
    if (status === 'reserved') {
      base.reservation_id = 1000 + reservedCounter;
      base.employee_number = 1000 + reservedCounter;
      base.reservedByUserId = reservedCounter % 2 === 0 ? 'user-1' : 'user-2';
      reservedCounter += 1;
    }
    return base;
  });
};

export const mockOverviewResponse: OverviewResponse = {
  summary: {
    totalDcs: 3,
    totalSlots: 720,
    totalOccupied: 510,
    totalAvailable: 210,
    averageUtilisationPercent: 70.8,
  },
  dcs: [
    {
      id: 'dc1',
      name: 'DC 1 - Mahindra City',
      cityId: 'chennai',
      totalSlots: 250,
      occupiedSlots: 190,
      availableSlots: 60,
      utilisationPercent: 76,
      predictedFillTimeMinutes: 45,
    },
    {
      id: 'dc2',
      name: 'DC 2 - Tidel',
      cityId: 'chennai',
      totalSlots: 300,
      occupiedSlots: 220,
      availableSlots: 80,
      utilisationPercent: 73,
      predictedFillTimeMinutes: 60,
    },
    {
      id: 'dc3',
      name: 'DC 3 - Siruseri',
      cityId: 'chennai',
      totalSlots: 170,
      occupiedSlots: 100,
      availableSlots: 70,
      utilisationPercent: 59,
      predictedFillTimeMinutes: 110,
    },
    {
      id: 'dc4',
      name: 'DC 4 - Whitefield',
      cityId: 'bangalore',
      totalSlots: 200,
      occupiedSlots: 120,
      availableSlots: 80,
      utilisationPercent: 60,
      predictedFillTimeMinutes: 90,
    },
    {
      id: 'dc5',
      name: 'DC 5 - Electronic City',
      cityId: 'bangalore',
      totalSlots: 180,
      occupiedSlots: 90,
      availableSlots: 90,
      utilisationPercent: 50,
      predictedFillTimeMinutes: 120,
    },
  ],
  cities: [
    { id: 'all', name: 'All' },
    { id: 'chennai', name: 'Chennai' },
    { id: 'bangalore', name: 'Bangalore' },
  ],
};

const buildDashboardSlots = (
  prefix: string,
  available: number,
  occupied: number,
  reserved: number,
): DashboardZoneSlot[] => {
  const statuses: SlotStatus[] = [
    ...Array(available).fill('available' as SlotStatus),
    ...Array(occupied).fill('occupied' as SlotStatus),
    ...Array(reserved).fill('reserved' as SlotStatus),
  ];

  return statuses.map((status, index) => {
    const slotNumberRaw = (index + 1).toString().padStart(2, '0');
    const slot_number = `${prefix}${slotNumberRaw}`;
    const isReserved = status === 'reserved';
    const isOccupied = status === 'occupied';
    return {
      parking_slot_id: index + 1,
      zone: prefix,
      slot_number,
      reservation_id: isReserved ? 1000 + index : undefined,
      employee_number: isReserved ? 1000 + index : undefined,
      available: status === 'available',
      reserved: isReserved,
      occupied: isOccupied,
    };
  });
};

type DashboardMockConfig = {
  id: string;
  summary?: Partial<DashboardResponse['summary']>;
  zones: Array<{
    id: string;
    label: string;
    code: string;
    availableSlots: number;
    occupiedSlots: number;
    reservedSlots: number;
  }>;
  predictions?: DashboardPredictionEntry[];
  alerts?: DashboardAlert[];
};

const buildPredictions = (
  totalSlots: number,
  baseOccupied: number,
  increments: number[] = [0, 3, 6, 4, 1],
): DashboardPredictionEntry[] => {
  const times = ['15:00', '15:30', '16:00', '16:30', '17:00'];
  return times.map((time, index) => {
    const occupied = Math.min(totalSlots, baseOccupied + increments[index]);
    const available = Math.max(totalSlots - occupied, 0);
    const occupancyPercent = Number(((occupied / totalSlots) * 100).toFixed(1));
    return { time, occupied, available, occupancyPercent };
  });
};

const buildDashboardFromConfig = (config: DashboardMockConfig): DashboardResponse => {
  const zones = config.zones.map((zone, index) => {
    return {
      id: zone.id || `${config.id}-zone-${index + 1}`,
      label: zone.label,
      code: zone.code,
      totalSlots: zone.availableSlots + zone.occupiedSlots + zone.reservedSlots,
      availableSlots: zone.availableSlots,
      occupiedSlots: zone.occupiedSlots,
      reservedSlots: zone.reservedSlots,
      slots: buildDashboardSlots(
        zone.code,
        zone.availableSlots,
        zone.occupiedSlots,
        zone.reservedSlots,
      ),
    };
  });

  const totalAvailable = zones.reduce((sum, zone) => sum + zone.availableSlots, 0);
  const totalOccupied = zones.reduce((sum, zone) => sum + zone.occupiedSlots, 0);
  const totalReserved = zones.reduce((sum, zone) => sum + zone.reservedSlots, 0);
  const totalSlots = totalAvailable + totalOccupied + totalReserved;

  const summary: DashboardResponse['summary'] = {
    availableSpots: totalAvailable,
    occupiedSpots: totalOccupied,
    predictedAvailableIn30Min:
      config.summary?.predictedAvailableIn30Min ?? Math.max(totalAvailable - 3, 0),
    utilisationRate: Number(((totalOccupied / totalSlots) * 100).toFixed(1)),
    timestamp: config.summary?.timestamp ?? '02:12:22 PM',
    dateLabel: config.summary?.dateLabel ?? 'Monday, November 17, 2025',
  };

  const predictions =
    config.predictions ?? buildPredictions(totalAvailable + totalOccupied, totalOccupied);

  const alerts =
    config.alerts ??
    [
      {
        id: `${config.id}-alert-1`,
        title: 'Stable traffic',
        message: 'Occupancy steady over the next hour',
        severity: 'info',
        timeAgo: '2 mins ago',
      },
    ];

  return { summary, zones, predictions, alerts };
};

const dashboardMockConfigs: DashboardMockConfig[] = [
  {
    id: 'dc1',
    summary: {
      predictedAvailableIn30Min: 36,
      timestamp: '03:10:12 PM',
      dateLabel: 'Tuesday, November 18, 2025',
    },
    zones: [
      { id: 'zone-a', label: 'Zone A', code: 'A', availableSlots: 18, occupiedSlots: 10, reservedSlots: 4 },
      { id: 'zone-b', label: 'Zone B', code: 'B', availableSlots: 12, occupiedSlots: 15, reservedSlots: 5 },
      { id: 'zone-c', label: 'Zone C', code: 'C', availableSlots: 10, occupiedSlots: 9, reservedSlots: 5 },
    ],
    predictions: [
      { time: '15:00', occupied: 34, available: 40, occupancyPercent: 45.9 },
      { time: '15:30', occupied: 38, available: 36, occupancyPercent: 51.4 },
      { time: '16:00', occupied: 42, available: 32, occupancyPercent: 56.8 },
      { time: '16:30', occupied: 40, available: 34, occupancyPercent: 54.1 },
      { time: '17:00', occupied: 36, available: 38, occupancyPercent: 48.6 },
    ],
    alerts: [
      {
        id: 'dc1-alert-1',
        title: 'Zone B nearing capacity',
        message: '6 reserved slots left in Zone B',
        severity: 'warning',
        timeAgo: '3 mins ago',
      },
      {
        id: 'dc1-alert-2',
        title: 'Sensor recalibration',
        message: 'Routine check scheduled for C3',
        severity: 'info',
        timeAgo: '12 mins ago',
      },
      {
        id: 'dc1-alert-3',
        title: 'Smooth operations',
        message: 'No incidents reported',
        severity: 'success',
        timeAgo: '20 mins ago',
      },
    ],
  },
  {
    id: 'dc2',
    summary: {
      predictedAvailableIn30Min: 32,
      timestamp: '03:10:12 PM',
      dateLabel: 'Tuesday, November 18, 2025',
    },
    zones: [
      { id: 'zone-a', label: 'Zone A', code: 'A', availableSlots: 14, occupiedSlots: 18, reservedSlots: 4 },
      { id: 'zone-b', label: 'Zone B', code: 'B', availableSlots: 16, occupiedSlots: 12, reservedSlots: 8 },
      { id: 'zone-c', label: 'Zone C', code: 'C', availableSlots: 8, occupiedSlots: 10, reservedSlots: 4 },
    ],
    predictions: [
      { time: '15:00', occupied: 40, available: 38, occupancyPercent: 51.3 },
      { time: '15:30', occupied: 43, available: 35, occupancyPercent: 55.1 },
      { time: '16:00', occupied: 46, available: 32, occupancyPercent: 59 },
      { time: '16:30', occupied: 44, available: 34, occupancyPercent: 56.4 },
      { time: '17:00', occupied: 41, available: 37, occupancyPercent: 52.6 },
    ],
    alerts: [
      {
        id: 'dc2-alert-1',
        title: 'Event traffic expected',
        message: 'Evening conference attendees arriving 4 PM',
        severity: 'warning',
        timeAgo: '7 mins ago',
      },
      {
        id: 'dc2-alert-2',
        title: 'Zone A refresh',
        message: 'Cleaning crew scheduled at 6 PM',
        severity: 'info',
        timeAgo: '15 mins ago',
      },
    ],
  },
  {
    id: 'dc3',
    summary: {
      predictedAvailableIn30Min: 48,
      timestamp: '03:10:12 PM',
      dateLabel: 'Tuesday, November 18, 2025',
    },
    zones: [
      { id: 'zone-a', label: 'Zone A', code: 'A', availableSlots: 22, occupiedSlots: 11, reservedSlots: 3 },
      { id: 'zone-b', label: 'Zone B', code: 'B', availableSlots: 18, occupiedSlots: 9, reservedSlots: 3 },
      { id: 'zone-c', label: 'Zone C', code: 'C', availableSlots: 12, occupiedSlots: 8, reservedSlots: 4 },
    ],
    predictions: [
      { time: '15:00', occupied: 28, available: 52, occupancyPercent: 35 },
      { time: '15:30', occupied: 30, available: 50, occupancyPercent: 37.5 },
      { time: '16:00', occupied: 33, available: 47, occupancyPercent: 41.3 },
      { time: '16:30', occupied: 31, available: 49, occupancyPercent: 38.8 },
      { time: '17:00', occupied: 29, available: 51, occupancyPercent: 36.3 },
    ],
    alerts: [
      {
        id: 'dc3-alert-1',
        title: 'Ample capacity',
        message: 'Plenty of availability across all zones',
        severity: 'success',
        timeAgo: '5 mins ago',
      },
    ],
  },
  {
    id: 'dc4',
    summary: {
      predictedAvailableIn30Min: 34,
      timestamp: '03:10:12 PM',
      dateLabel: 'Tuesday, November 18, 2025',
    },
    zones: [
      { id: 'zone-a', label: 'Zone A', code: 'A', availableSlots: 15, occupiedSlots: 18, reservedSlots: 3 },
      { id: 'zone-b', label: 'Zone B', code: 'B', availableSlots: 10, occupiedSlots: 14, reservedSlots: 6 },
      { id: 'zone-c', label: 'Zone C', code: 'C', availableSlots: 20, occupiedSlots: 12, reservedSlots: 4 },
    ],
    predictions: [
      { time: '15:00', occupied: 44, available: 45, occupancyPercent: 49.4 },
      { time: '15:30', occupied: 47, available: 42, occupancyPercent: 52.8 },
      { time: '16:00', occupied: 50, available: 39, occupancyPercent: 56.2 },
      { time: '16:30', occupied: 48, available: 41, occupancyPercent: 53.9 },
      { time: '17:00', occupied: 46, available: 43, occupancyPercent: 51.7 },
    ],
    alerts: [
      {
        id: 'dc4-alert-1',
        title: 'Evening outflow',
        message: 'Expected drop after 6 PM',
        severity: 'info',
        timeAgo: '9 mins ago',
      },
      {
        id: 'dc4-alert-2',
        title: 'Zone C preferred',
        message: 'Direct visitors to Zone C for faster entry',
        severity: 'success',
        timeAgo: '18 mins ago',
      },
    ],
  },
  {
    id: 'dc5',
    summary: {
      predictedAvailableIn30Min: 50,
      timestamp: '03:10:12 PM',
      dateLabel: 'Tuesday, November 18, 2025',
    },
    zones: [
      { id: 'zone-a', label: 'Zone A', code: 'A', availableSlots: 24, occupiedSlots: 10, reservedSlots: 4 },
      { id: 'zone-b', label: 'Zone B', code: 'B', availableSlots: 16, occupiedSlots: 8, reservedSlots: 4 },
      { id: 'zone-c', label: 'Zone C', code: 'C', availableSlots: 14, occupiedSlots: 9, reservedSlots: 3 },
    ],
    predictions: [
      { time: '15:00', occupied: 27, available: 54, occupancyPercent: 33.3 },
      { time: '15:30', occupied: 29, available: 52, occupancyPercent: 35.8 },
      { time: '16:00', occupied: 32, available: 49, occupancyPercent: 39.5 },
      { time: '16:30', occupied: 30, available: 51, occupancyPercent: 37.1 },
      { time: '17:00', occupied: 28, available: 53, occupancyPercent: 34.6 },
    ],
    alerts: [
      {
        id: 'dc5-alert-1',
        title: 'Plenty of space',
        message: 'Direct arrivals to Zones A and B',
        severity: 'success',
        timeAgo: '4 mins ago',
      },
    ],
  },
];

export const mockDashboardResponsesByDc: Record<string, DashboardResponse> =
  dashboardMockConfigs.reduce<Record<string, DashboardResponse>>((acc, config) => {
    acc[config.id] = buildDashboardFromConfig(config);
    return acc;
  }, {});

export const mockDashboardResponse = mockDashboardResponsesByDc[dashboardMockConfigs[0].id];

export const getMockDashboardResponse = (dcId: string) =>
  mockDashboardResponsesByDc[dcId] ?? mockDashboardResponse;

export const mockParkingMapResponse: ParkingMapResponse = {
  zones: [
    {
      id: 'zone-a',
      label: 'Zone A',
      totalSlots: 32,
      slots: buildParkingSlots('A', buildSlotStatuses(20, 8, 4)),
    },
    {
      id: 'zone-b',
      label: 'Zone B',
      totalSlots: 32,
      slots: buildParkingSlots('B', buildSlotStatuses(18, 10, 4)),
    },
    {
      id: 'zone-c',
      label: 'Zone C',
      totalSlots: 24,
      slots: buildParkingSlots('C', buildSlotStatuses(16, 6, 2)),
    },
    {
      id: 'zone-d',
      label: 'Zone D',
      totalSlots: 24,
      slots: buildParkingSlots('D', buildSlotStatuses(14, 6, 4)),
    },
  ],
  predictionSummary: {
    predictedOccupancyPercent: 72,
    available: 58,
    occupied: 150,
  },
  forecast: [
    { time: '11:00 AM', occupancyPercent: 91 },
    { time: '12:00 PM', occupancyPercent: 94 },
    { time: '12:30 PM', occupancyPercent: 96 },
    { time: '01:00 PM', occupancyPercent: 95 },
    { time: '01:30 PM', occupancyPercent: 92 },
    { time: '02:00 PM', occupancyPercent: 90 },
  ],
};

export const mockParkingReservationResponse: ParkingReservationResponse = {
  message: 'Reservation successful',
  reservation_id: 13,
  status: 'active',
  reserved_from: '2025-11-25T09:00:00',
  reserved_to: '2025-11-25T13:00:00',
  parking_lot_id: 1,
  parking_slot_id: 5,
  employee_number: 1001,
};

export const mockBookingsResponse: BookingsResponse = {
  header: {
    timestamp: '02:14:49 PM',
    dateLabel: 'Monday, November 17, 2025',
  },
  summary: {
    bookingId: 'BK-2024-10-001',
    vehicleType: 'Sedan',
    userName: 'John Doe',
    bookingStatus: 'confirmed',
  },
  timing: {
    bookingDateTime: 'November 2, 2025 - 14:30',
    expectedArrival: '14:30',
    expectedExit: '18:30',
    duration: '4 hours',
  },
  slot: {
    slotNumber: 'A115',
    zone: 'Zone A - Main Building',
    slotStatus: 'reserved',
  },
  occupancy: {
    current: 72,
    atArrival: 85,
    atExit: 62,
  },
};

// Export all mock data as a database object for json-server
export const mockDatabase = {
  overview: mockOverviewResponse,
  dashboard: Object.values(mockDashboardResponsesByDc),
  parkingMap: mockParkingMapResponse,
  bookings: mockBookingsResponse,
  reservations: [mockParkingReservationResponse],
};
