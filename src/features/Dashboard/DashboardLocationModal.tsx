import React from 'react';
import { Form, Modal, Select, Space, Typography } from 'antd';
import { DASHBOARD_LOCATIONS } from 'constants/DashboardLocations';

interface DashboardLocationModalProps {
  open: boolean;
  onSubmit: (payload: { cityId: string; dcId: string }) => void;
  onCancel: () => void;
  initialCityId?: string | null;
  initialDcId?: string | null;
  allowDismiss?: boolean;
}

const { Text } = Typography;

const DashboardLocationModal: React.FC<DashboardLocationModalProps> = ({
  open,
  onSubmit,
  onCancel,
  initialCityId,
  initialDcId,
  allowDismiss = false,
}) => {
  const getFirstDcForCity = React.useCallback(
    (cityIdValue: string | undefined | null) => {
      const cityMatch = DASHBOARD_LOCATIONS.find((city) => city.cityId === cityIdValue);
      return cityMatch?.dcs[0]?.id ?? '';
    },
    [],
  );

  const [cityId, setCityId] = React.useState<string>(
    initialCityId ?? DASHBOARD_LOCATIONS[0]?.cityId ?? '',
  );
  const [dcId, setDcId] = React.useState<string>(
    initialDcId ?? getFirstDcForCity(initialCityId ?? DASHBOARD_LOCATIONS[0]?.cityId),
  );

  React.useEffect(() => {
    if (!open) return;
    const nextCity = initialCityId ?? DASHBOARD_LOCATIONS[0]?.cityId ?? '';
    setCityId(nextCity);
    const nextDc = initialDcId ?? getFirstDcForCity(nextCity);
    setDcId(nextDc);
  }, [open, initialCityId, initialDcId, getFirstDcForCity]);

  const dcOptions = React.useMemo(() => {
    const match = DASHBOARD_LOCATIONS.find((city) => city.cityId === cityId);
    return match?.dcs ?? [];
  }, [cityId]);

  React.useEffect(() => {
    if (!dcOptions.length) {
      setDcId('');
      return;
    }
    const hasSelection = dcOptions.some((dc) => dc.id === dcId);
    if (!hasSelection) {
      setDcId(dcOptions[0].id);
    }
  }, [dcOptions, dcId]);

  const handleSubmit = () => {
    if (!cityId || !dcId) return;
    onSubmit({ cityId, dcId });
  };

  const cityOptions = DASHBOARD_LOCATIONS.map((city) => ({
    value: city.cityId,
    label: city.cityName,
  }));

  return (
    <Modal
      open={open}
      onOk={handleSubmit}
      okText="Load dashboard"
      onCancel={allowDismiss ? onCancel : undefined}
      cancelButtonProps={{
        disabled: !allowDismiss,
        style: allowDismiss ? undefined : { display: 'none' },
      }}
      maskClosable={allowDismiss}
      keyboard={allowDismiss}
      closable={allowDismiss}
      okButtonProps={{ disabled: !cityId || !dcId }}
      title="Choose your location"
    >
      <Space direction="vertical" size={20} style={{ width: '100%' }}>
        <Text type="secondary" style={{ lineHeight: 1.5 }}>
          Select a city and data centre. Your choice sticks for this session until you change it.
        </Text>
        <Form layout="vertical" style={{ marginTop: 4 }}>
          <Form.Item label="City" style={{ marginBottom: 16 }}>
            <Select
              placeholder="Select a city"
              options={cityOptions}
              value={cityId || undefined}
              onChange={(value) => setCityId(value)}
              style={{ width: '100%' }}
              size="large"
            />
          </Form.Item>
          <Form.Item label="Data Centre" style={{ marginBottom: 0 }}>
            <Select
              placeholder="Select a data centre"
              options={dcOptions.map((dc) => ({ value: dc.id, label: dc.name }))}
              value={dcId || undefined}
              onChange={(value) => setDcId(value)}
              style={{ width: '100%' }}
              disabled={!cityId}
              size="large"
            />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};

export default DashboardLocationModal;
