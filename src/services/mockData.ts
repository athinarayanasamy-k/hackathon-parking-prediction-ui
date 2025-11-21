/**
 * Mock Data Service
 * Provides mock data for development and demo purposes
 */

export const mockZones = [
  {
    id: "zone-c1",
    dcId: "dc-001",
    name: "Zone C",
    totalSlots: 75,
    availableSlots: 15,
    occupiedSlots: 55,
    reservedSlots: 5,
  },
  {
    id: "zone-d1",
    dcId: "dc-001",
    name: "Zone D",
    totalSlots: 120,
    availableSlots: 45,
    occupiedSlots: 70,
    reservedSlots: 5,
  },
  {
    id: "zone-e1",
    dcId: "dc-001",
    name: "Zone E",
    totalSlots: 100,
    availableSlots: 32,
    occupiedSlots: 60,
    reservedSlots: 8,
  },
];

export const mockPredictions = {
  zoneId: "zone-c1",
  date: "2025-11-17",
  predictions: [
    { hour: 15, predictedOccupancy: 68, predictedAvailable: 24, confidence: 92 },
    { hour: 16, predictedOccupancy: 75, predictedAvailable: 19, confidence: 88 },
    { hour: 17, predictedOccupancy: 82, predictedAvailable: 13, confidence: 85 },
    { hour: 18, predictedOccupancy: 78, predictedAvailable: 17, confidence: 83 },
    { hour: 19, predictedOccupancy: 65, predictedAvailable: 26, confidence: 80 },
  ],
  estimatedFillTime: 1.5,
};

export const mockDCs = [
  {
    id: "dc-001",
    name: "Chennai Data Center",
    totalSlots: 295,
    availableSlots: 92,
    occupancyRate: 68.8,
    location: "Chennai",
  },
  {
    id: "dc-002",
    name: "Bangalore Data Center",
    totalSlots: 280,
    availableSlots: 85,
    occupancyRate: 69.6,
    location: "Bangalore",
  },
];

export const mockParkingSlots = Array.from({ length: 75 }, (_, i) => {
  const statuses = ["available", "occupied", "reserved"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  return {
    id: `slot-${i + 1}`,
    zoneId: "zone-c1",
    status: randomStatus as "available" | "occupied" | "reserved",
    level: Math.floor(i / 18) + 1,
    position: String(i + 1).padStart(2, "0"),
  };
});
