/**
 * API Endpoints Configuration
 * Centralized definition of all API endpoints
 */

export const API_ENDPOINTS = {
  PARKING: {
    DCS: "/parking/dcs",
    DC_BY_ID: (dcId: string) => `/parking/dcs/${dcId}`,
    ZONES: (dcId: string) => `/parking/dcs/${dcId}/zones`,
    ZONE_BY_ID: (zoneId: string) => `/parking/zones/${zoneId}`,
    SLOTS: (zoneId: string) => `/parking/zones/${zoneId}/slots`,
  },
  PREDICTIONS: {
    HOURLY: (zoneId: string) => `/predictions/hourly/${zoneId}`,
    OCCUPANCY: "/predictions/occupancy",
    FILL_TIME: (zoneId: string) => `/predictions/fillTime/${zoneId}`,
  },
  BOOKINGS: {
    CREATE: "/bookings",
    USER_BOOKINGS: (userId: string) => `/bookings/user/${userId}`,
    CANCEL: (bookingId: string) => `/bookings/${bookingId}`,
  },
  ANALYTICS: "/analytics",
  NOTIFICATIONS: (userId: string) => `/notifications/${userId}`,
};

/**
 * Application Routes
 */
export const APP_ROUTES = {
  HOME: "/",
  OVERVIEW: "/overview",
  DASHBOARD: "/dashboard",
  PARKING_MAP: "/parking-map",
  BOOKINGS: "/bookings",
  ANALYTICS: "/analytics",
  NOTIFICATIONS: "/notifications",
  SETTINGS: "/settings",
};

/**
 * Parking Slot Status Colors
 */
export const SLOT_STATUS_COLORS = {
  available: "#22c55e", // Green
  occupied: "#ef4444", // Red
  reserved: "#eab308", // Yellow
};

/**
 * Parking Slot Status Labels
 */
export const SLOT_STATUS_LABELS: Record<string, string> = {
  available: "Available",
  occupied: "Occupied",
  reserved: "Reserved",
};

/**
 * Booking Status
 */
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

/**
 * Default pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};
