import React from 'react';
import {
  Card,
  Col,
  DatePicker,
  Modal,
  Row,
  Tag,
  TimePicker,
  Typography,
  message,
  notification,
} from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import type { ParkingZone, ParkingSlot, ParkingSlotStatus } from 'services/parkingMapApi';
import { useReserveParkingSlotMutation } from 'services/parkingMapApi';
import { useParkingMapContext } from 'contexts/ParkingMapContext';
import { CURRENT_USER_ID } from 'constants/User';

const { Text } = Typography;

interface ModalState {
  visible: boolean;
  mode: 'book' | 'cancel';
  zoneLabel?: string;
  zoneId?: string;
  slot?: ParkingSlot;
}

const statusColorMap: Record<ParkingSlotStatus, { label: string; color: string }> = {
  available: { label: 'Available', color: '#10b981' },
  occupied: { label: 'Occupied', color: '#ef4444' },
  reserved: { label: 'Reserved', color: '#f59e0b' },
};

const slotStyleMap: Record<ParkingSlotStatus, React.CSSProperties> = {
  available: {
    background: 'linear-gradient(180deg, #34d399 0%, #10b981 100%)',
    boxShadow: '0 10px 18px rgba(16,185,129,0.35)',
    color: '#fff',
  },
  occupied: {
    background: 'linear-gradient(180deg, #fb7185 0%, #ef4444 100%)',
    boxShadow: '0 10px 18px rgba(239,68,68,0.35)',
    color: '#fff',
  },
  reserved: {
    background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)',
    boxShadow: '0 10px 18px rgba(245,158,11,0.35)',
    color: '#fff',
  },
};

const cloneZones = (zones: ParkingZone[]) =>
  zones.map((zone) => ({
    ...zone,
    slots: zone.slots.map((slot, index) => ({
      ...slot,
      reservedByUserId:
        slot.reservedByUserId ?? (slot.status === 'reserved' ? `user-${(index % 3) + 2}` : undefined),
    })),
  }));

const ParkingMapZones: React.FC = () => {
  const { zones } = useParkingMapContext();
  const [zoneState, setZoneState] = React.useState<ParkingZone[]>(() => cloneZones(zones));
  const [modalState, setModalState] = React.useState<ModalState>({ visible: false, mode: 'book' });
  const [reserveDate, setReserveDate] = React.useState<Dayjs | null>(null);
  const [reserveTimeRange, setReserveTimeRange] = React.useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [reserveParkingSlot, { isLoading: isReserving }] = useReserveParkingSlotMutation();
  const [notificationApi, notificationContext] = notification.useNotification();

  const deriveSlotStatus = (slot: ParkingSlot): ParkingSlotStatus => {
    if (slot.reserved ?? slot.status === 'reserved') return 'reserved';
    if (slot.occupied ?? slot.status === 'occupied') return 'occupied';
    return 'available';
  };

  React.useEffect(() => {
    setZoneState(cloneZones(zones));
  }, [zones]);

  const deriveCounts = (zone: ParkingZone) =>
    zone.slots.reduce(
      (acc, slot) => {
        const status = deriveSlotStatus(slot);
        acc[status] += 1;
        return acc;
      },
      { available: 0, occupied: 0, reserved: 0 },
    );

  const resetReservationInputs = () => {
    setReserveDate(null);
    setReserveTimeRange([null, null]);
  };

  const isDateDisabled = (date: Dayjs) => {
    if (!date) return false;
    const today = dayjs().startOf('day');
    const isFriday = today.day() === 5;
    const maxDay = isFriday ? today.add(3, 'day').endOf('day') : today.add(1, 'day').endOf('day');
    return date.isBefore(today, 'day') || date.isAfter(maxDay, 'day');
  };

  const isValidTimeRange = () => {
    if (!reserveDate) return false;
    const [start, end] = reserveTimeRange;
    if (!start || !end) return false;
    return end.isAfter(start);
  };

  const openModal = (zone: ParkingZone, slot: ParkingSlot) => {
    const slotStatus = deriveSlotStatus(slot);
    if (slotStatus === 'occupied') return;
    if (slotStatus === 'reserved') {
      if (!slot.reservedByUserId) {
        message.warning('Unable to cancel because the reservation owner is unknown.');
        return;
      }
      if (slot.reservedByUserId !== CURRENT_USER_ID) {
        message.warning('You can only cancel reservations that you created.');
        return;
      }
    }
    setModalState({
      visible: true,
      mode: slotStatus === 'reserved' ? 'cancel' : 'book',
      zoneLabel: zone.label,
      zoneId: zone.id,
      slot,
    });
  };

  const buildIso = (date: Dayjs | null, time: Dayjs | null) => {
    if (!date || !time) return null;
    return date
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .millisecond(0)
      .toISOString();
  };

  const handleModalAction = async () => {
    const { zoneId, slot, mode } = modalState;
    if (!zoneId || !slot) return;

    if (mode === 'book') {
      const [fromTime, toTime] = reserveTimeRange;
      const reserved_from = buildIso(reserveDate, fromTime);
      const reserved_to = buildIso(reserveDate, toTime);
      if (!reserved_from || !reserved_to) return;

      const parking_slot_id =
        slot.parking_slot_id ??
        (Number(String(slot.id).match(/\d+/)?.[0] ?? 0) || Math.floor(Math.random() * 1000));

      const payload = {
        employee_number: slot.employee_number ?? 1001,
        parking_lot_id: slot.parking_lot_id ?? 1,
        parking_slot_id,
        reserved_from,
        reserved_to,
      };

      try {
        const res = await reserveParkingSlot(payload).unwrap();
        message.success(res.message || 'Reservation successful');
        notificationApi.success({
          message: res.message || 'Reservation successful',
          description: (
            <div className="space-y-1">
              <div>
                <strong>Reservation ID:</strong> {res.reservation_id ?? '—'}
              </div>
              <div>
                <strong>Slot:</strong> {slot.slot_number ?? slot.id}
              </div>
              <div>
                <strong>From:</strong>{' '}
                {res.reserved_from ? dayjs(res.reserved_from).format('YYYY-MM-DD HH:mm') : reserved_from}
              </div>
              <div>
                <strong>To:</strong>{' '}
                {res.reserved_to ? dayjs(res.reserved_to).format('YYYY-MM-DD HH:mm') : reserved_to}
              </div>
            </div>
          ),
          placement: 'bottomRight',
          duration: 4,
        });
        setZoneState((prev) =>
          prev.map((zone) =>
            zone.id !== zoneId
              ? zone
              : {
                  ...zone,
                  slots: zone.slots.map((s) =>
                    s.id === slot.id
                      ? {
                          ...s,
                          status: 'reserved',
                          reserved: true,
                          available: false,
                          occupied: false,
                          reservation_id: res.reservation_id,
                          employee_number: res.employee_number,
                          reservedByUserId: CURRENT_USER_ID,
                        }
                      : s,
                  ),
                },
          ),
        );
      } catch (error) {
        message.error('Failed to reserve slot. Please try again.');
      }
    } else {
      setZoneState((prev) =>
        prev.map((zone) =>
          zone.id !== zoneId
            ? zone
            : {
                ...zone,
                slots: zone.slots.map((s) =>
                  s.id === slot.id
                    ? {
                        ...s,
                        status: 'available',
                        reserved: false,
                        available: true,
                        occupied: false,
                        reservation_id: null,
                        employee_number: null,
                        reservedByUserId: undefined,
                      }
                    : s,
                ),
              },
        ),
      );
    }

    setModalState({ visible: false, mode: 'book' });
    resetReservationInputs();
  };

  const closeModal = () => {
    setModalState({ visible: false, mode: 'book' });
    resetReservationInputs();
  };

  return (
    <>
      {notificationContext}
      <Card bordered={false} style={{ borderRadius: 24, padding: 24, boxShadow: '0 20px 45px rgba(15,23,42,0.08)' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Typography.Title level={4} style={{ marginBottom: 4 }}>
              Parking Map Overview
            </Typography.Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Tap an available slot to reserve or cancel an existing booking
            </Text>
          </Col>
          <Col>
            <Row gutter={12} wrap={false} align="middle">
              {Object.entries(statusColorMap).map(([key, meta]) => (
                <Col key={key}>
                  <Tag color={meta.color} style={{ borderRadius: 999, padding: '4px 12px', color: '#fff' }}>
                    {meta.label}
                  </Tag>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          {zoneState.map((zone) => {
            const counts = deriveCounts(zone);
            return (
              <Col xs={24} md={12} key={zone.id}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 24,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 16px 35px rgba(15,23,42,0.08)',
                    padding: 16,
                    minHeight: 220,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <Text strong style={{ fontSize: 18 }}>
                        {zone.label}
                      </Text>
                      <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                        {zone.totalSlots} total slots
                      </Text>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 12 }}>
                      <span style={{ color: '#10b981', fontWeight: 600, marginRight: 12 }}>
                        Available: {counts.available}
                      </span>
                      <span style={{ color: '#ef4444', fontWeight: 600 }}>
                        Occupied: {counts.occupied}
                      </span>
                    </div>
                  </div>
                  <Row gutter={[8, 8]}>
                    {zone.slots.map((slot) => (
                      <Col span={6} key={slot.id}>
                        <div
                          onClick={() => openModal(zone, slot)}
                          style={{
                            height: 60,
                            borderRadius: 18,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: deriveSlotStatus(slot) === 'occupied' ? 'not-allowed' : 'pointer',
                            opacity: deriveSlotStatus(slot) === 'occupied' ? 0.6 : 1,
                            ...slotStyleMap[deriveSlotStatus(slot)],
                          }}
                        >
                          <div>
                            <div>{slot.slot_number ?? slot.id}</div>
                            <div style={{ fontSize: 11, letterSpacing: 1 }}>
                              {statusColorMap[deriveSlotStatus(slot)].label}
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>

      <Modal
        open={modalState.visible}
        onCancel={closeModal}
        onOk={handleModalAction}
        okText={modalState.mode === 'book' ? 'Confirm Booking' : 'Cancel Booking'}
        cancelText="Close"
        centered
        destroyOnClose
        okButtonProps={{
          disabled:
            modalState.mode === 'book' &&
            !(reserveDate && reserveTimeRange[0] && reserveTimeRange[1] && isValidTimeRange()),
          loading: isReserving,
        }}
        title="Parking Slot Booking"
      >
        {modalState.slot && (
          <div style={{ padding: '12px 0' }}>
            <Card
              bordered={false}
              style={{
                border: '1px solid #dbeafe',
                borderRadius: 16,
                display: 'block',
                padding: '12px 16px',
                boxShadow: '0 10px 25px rgba(59,130,246,0.15)',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong style={{ fontSize: 18 }}>
                    {modalState.slot.slot_number ?? modalState.slot.id}
                  </Text>
                  <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                    Zone {modalState.zoneLabel}
                  </Text>
                </div>
                <Tag color={statusColorMap[deriveSlotStatus(modalState.slot)].color}>
                  {statusColorMap[deriveSlotStatus(modalState.slot)].label}
                </Tag>
              </div>
            </Card>

            {modalState.mode === 'book' ? (
              <div className="space-y-3">
                <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                  Enter reservation date and time range
                </Text>
                <div className="space-y-2">
                  <Text className="block text-sm">Date</Text>
                  <DatePicker
                    style={{ width: '100%' }}
                    value={reserveDate}
                    onChange={(value) => setReserveDate(value)}
                    allowClear
                    disabledDate={isDateDisabled}
                  />
                </div>
                <div className="space-y-2">
                  <Text className="block text-sm">Time Range</Text>
                  <TimePicker.RangePicker
                    style={{ width: '100%' }}
                    value={reserveTimeRange}
                    onChange={(value) => setReserveTimeRange(value ?? [null, null])}
                    format="HH:mm"
                    minuteStep={15}
                  />
                  {!isValidTimeRange() && reserveTimeRange[0] && reserveTimeRange[1] && (
                    <Text type="danger" style={{ fontSize: 12 }}>
                      End time must be after start time.
                    </Text>
                  )}
                </div>
              </div>
            ) : (
              <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                This slot is currently reserved. Would you like to cancel it?
              </Text>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ParkingMapZones;
