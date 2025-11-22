import React from 'react';
import { Card, Col, Modal, Row, Space, Tag, Tooltip, Typography } from 'antd';
import type { CSSProperties } from 'react';
import type { DashboardZoneDetail, DashboardZoneSlot, SlotStatus } from 'services/dashboardApi';
import { SLOT_STATUS_COLORS, SLOT_STATUS_LABELS } from 'constants/ApiConstants';
import { useDashboardContext } from 'contexts/DashboardContext';

const { Title, Text } = Typography;

const slotVisualStyles: Record<SlotStatus, CSSProperties> = {
  available: {
    background: 'linear-gradient(180deg, #34d399 0%, #059669 100%)',
    color: '#fff',
    boxShadow: '0 12px 25px rgba(16,185,129,0.35)',
  },
  occupied: {
    background: 'linear-gradient(180deg, #fb7185 0%, #ef4444 100%)',
    color: '#fff',
    boxShadow: '0 12px 25px rgba(239,68,68,0.35)',
  },
  reserved: {
    background: 'linear-gradient(180deg, #facc15 0%, #f59e0b 100%)',
    color: '#fff',
    boxShadow: '0 12px 25px rgba(245,158,11,0.35)',
  },
};

const badgeStyle: CSSProperties = {
  width: 56,
  height: 92,
  borderRadius: 22,
  background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '18px 6px',
  boxShadow: 'inset 0 6px 18px rgba(255,255,255,0.3)',
};

const chipStyle: CSSProperties = {
  borderRadius: 999,
  padding: '4px 12px',
  fontWeight: 600,
  boxShadow: '0 2px 6px rgba(15,23,42,0.08)',
};

const DashboardZoneOverview: React.FC = () => {
  const { zones } = useDashboardContext();
  const [selectedZone, setSelectedZone] = React.useState<DashboardZoneDetail | null>(null);

  const getSlotStatus = React.useCallback((slot: DashboardZoneSlot): SlotStatus => {
    if (slot.reserved) return 'reserved';
    if (slot.occupied) return 'occupied';
    return 'available';
  }, []);

  const handleZoneClick = (zone: DashboardZoneDetail) => {
    setSelectedZone(zone);
  };

  const closeModal = () => setSelectedZone(null);

  return (
    <>
      <Card
      bordered={false}
      style={{
        borderRadius: 24,
        border: '1px solid #edf2f7',
        boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
        padding: 24,
      }}
    >
      <Row justify="space-between" align="middle" gutter={[12, 12]}>
        <Col>
          <Title level={5} style={{ marginBottom: 0 }}>
            Parking Slot Availability - Zone
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Live status by monitored sections
          </Text>
        </Col>
        <Col>
          <Space size={[8, 8]} wrap>
            {(Object.keys(SLOT_STATUS_LABELS) as SlotStatus[]).map((status) => (
              <Tag
                key={status}
                color={SLOT_STATUS_COLORS[status as keyof typeof SLOT_STATUS_COLORS]}
                style={{ borderRadius: 999, padding: '4px 12px' }}
              >
                {SLOT_STATUS_LABELS[status]}
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 16 }}>
        {zones.map((zone) => (
          <Col key={zone.id} xs={24} md={12}>
            <Card
              hoverable
              bordered={false}
              bodyStyle={{
                borderRadius: 24,
                border: '1px solid #e2e8f0',
                boxShadow: '0 16px 35px rgba(15,23,42,0.06)',
                padding: 20,
                height: '100%',
              }}
              style={{ cursor: 'pointer' }}
              onClick={() => handleZoneClick(zone)}
            >
              <Row justify="space-between" align="middle" gutter={[12, 12]}>
                <Col flex="auto">
                  <Space align="center" size={16}>
                    <div style={badgeStyle}>
                      <span style={{ fontSize: 26, fontWeight: 600 }}>{zone.code}</span>
                      <span style={{ fontSize: 10, letterSpacing: 1, marginTop: 4, opacity: 0.8 }}>Zone</span>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        {zone.label}
                      </Text>
                      <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                        {zone.totalSlots} total slots
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Space size={[8, 8]} wrap>
                    <span style={{ ...chipStyle, background: '#ecfdf5', color: '#047857' }}>
                      {zone.availableSlots} Available
                    </span>
                    <span style={{ ...chipStyle, background: '#fee2e2', color: '#b91c1c' }}>
                      {zone.occupiedSlots} Occupied
                    </span>
                    <span style={{ ...chipStyle, background: '#fef3c7', color: '#b45309' }}>
                      {zone.reservedSlots} Reserved
                    </span>
                  </Space>
                </Col>
              </Row>

              <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                  {(() => {
                    const displayedSlots = zone.slots.slice(0, 8);
                    const remaining = Math.max(zone.slots.length - displayedSlots.length, 0);
                    return (
                      <>
                        <Row gutter={[12, 12]}>
                          {displayedSlots.map((slot) => {
                            const slotStatus = getSlotStatus(slot);
                            const slotNumber = slot.slot_number ?? `${slot.zone}-${slot.parking_slot_id}`;
                            const tooltipContent = slot.reserved ? (
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between gap-8">
                                  <span className="text-gray-500">Reservation ID</span>
                                  <span className="font-semibold">{slot.reservation_id ?? 'N/A'}</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                  <span className="text-gray-500">Employee #</span>
                                  <span className="font-semibold">{slot.employee_number ?? 'N/A'}</span>
                                </div>
                              </div>
                            ) : null;
                            return (
                              <Col span={6} key={slot.slot_number}>
                                <Tooltip title={tooltipContent} open={slot.reserved ? undefined : false}>
                                  <div
                                    style={{
                                      height: 66,
                                      borderRadius: 18,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      textAlign: 'center',
                                      fontWeight: 600,
                                      transition: 'transform 120ms ease',
                                      ...slotVisualStyles[slotStatus],
                                    }}
                                  >
                                    <div>
                                      <div style={{ fontSize: 18 }}>
                                        {(slotNumber ?? '').toString().replace(/^([A-Za-z]+)-?/, '')}
                                      </div>
                                      <div style={{ fontSize: 11, letterSpacing: 1 }}>
                                        {SLOT_STATUS_LABELS[slotStatus]}
                                      </div>
                                    </div>
                                  </div>
                                </Tooltip>
                              </Col>
                            );
                          })}
                        </Row>
                        {remaining > 0 && (
                          <Text
                            type="secondary"
                            style={{ display: 'block', marginTop: 8, fontSize: 12, textAlign: 'right' }}
                          >
                            +{remaining} more slots
                          </Text>
                        )}
                      </>
                    );
                  })()}
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
      <Modal
        open={Boolean(selectedZone)}
        onCancel={closeModal}
        footer={null}
        width={800}
        centered
        title={
          selectedZone ? (
            <Space size="large" align="center">
              <div style={badgeStyle}>
                <span style={{ fontSize: 26, fontWeight: 600 }}>{selectedZone.code}</span>
                <span style={{ fontSize: 10, letterSpacing: 1, marginTop: 4, opacity: 0.8 }}>Zone</span>
              </div>
              <div>
                <Text strong style={{ fontSize: 20 }}>
                  {selectedZone.label}
                </Text>
                <Text type="secondary" style={{ display: 'block', fontSize: 13 }}>
                  {selectedZone.totalSlots} total slots
                </Text>
              </div>
            </Space>
          ) : null
        }
      >
        {selectedZone && (
          <>
            <Space size={[10, 10]} wrap style={{ marginBottom: 16 }}>
              <span style={{ ...chipStyle, background: '#ecfdf5', color: '#047857' }}>
                {selectedZone.availableSlots} Available
              </span>
              <span style={{ ...chipStyle, background: '#fee2e2', color: '#b91c1c' }}>
                {selectedZone.occupiedSlots} Occupied
              </span>
              <span style={{ ...chipStyle, background: '#fef3c7', color: '#b45309' }}>
                {selectedZone.reservedSlots} Reserved
              </span>
            </Space>
            <Row gutter={[14, 14]}>
              {selectedZone.slots.map((slot) => {
                const slotStatus = getSlotStatus(slot);
                const slotNumber = slot.slot_number ?? `${slot.zone}-${slot.parking_slot_id}`;
                const tooltipContent = slot.reserved ? (
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-8">
                      <span className="text-gray-500">Reservation ID</span>
                      <span className="font-semibold">{slot.reservation_id ?? 'N/A'}</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-gray-500">Employee #</span>
                      <span className="font-semibold">{slot.employee_number ?? 'N/A'}</span>
                    </div>
                  </div>
                ) : null;
                return (
                  <Col span={6} key={slot.slot_number}>
                    <Tooltip title={tooltipContent} open={slot.reserved ? undefined : false}>
                      <div
                        style={{
                          height: 72,
                          borderRadius: 18,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          fontWeight: 600,
                          ...slotVisualStyles[slotStatus],
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 18 }}>
                            {(slotNumber ?? '').toString().replace(/^([A-Za-z]+)-?/, '')}
                          </div>
                          <div style={{ fontSize: 11, letterSpacing: 1 }}>{SLOT_STATUS_LABELS[slotStatus]}</div>
                        </div>
                      </div>
                    </Tooltip>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Modal>
    </>
  );
};

export default DashboardZoneOverview;
