// src/features/Overview/OverviewDcSection.tsx
import React from 'react';
import DropdownSelect from 'components/DropdownSelect';
import type { DropdownSelectOption } from 'components/DropdownSelect';
import { Card, Col, Progress, Row, Space, Typography } from 'antd';
import type { DcOverview } from 'services/parkingApi';
import { OVERVIEW_LABELS } from 'constants/OverviewLabels';
import { useOverviewContext } from 'contexts/OverviewContext';

const { Text, Title } = Typography;

const OverviewDcSection: React.FC = () => {
  const { overview, selectedCity, setSelectedCity, setSelectedDc, filteredDcs } =
    useOverviewContext();

  // City options
  const cityOptions: DropdownSelectOption[] = (overview.cities || []).map((city) => ({
    value: city.id,
    label: city.name,
  }));

  // DC options filtered by city
  const dcOptions: DropdownSelectOption[] = React.useMemo(() => {
    let filtered = overview.dcs;
    if (selectedCity !== 'all') filtered = filtered.filter((dc) => dc.cityId === selectedCity);
    return [
      { value: 'all', label: 'All' },
      ...filtered.map((dc) => ({ value: dc.id, label: dc.name })),
    ];
  }, [overview, selectedCity]);

  return (
    <div className="mt-4">
      <Title level={5} className="!mb-3">
        {OVERVIEW_LABELS.dcUtilisationToday}
      </Title>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexFlow: 'row-reverse' }}>
        <DropdownSelect
          style={{ minWidth: 200 }}
          // value={selectedDc}
          onChange={setSelectedDc}
          options={dcOptions}
          placeholder="Select DC"
        />
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
      </div>
      <Row gutter={[16, 16]}>
        {filteredDcs.map((dc: DcOverview) => (
          <Col key={dc.id} xs={24} md={12} xl={8}>
            <Card bordered={false} className="rounded-2xl shadow-sm border border-gray-100 h-full">
              <Space direction="vertical" className="w-full">
                <Text strong>{dc.name}</Text>
                <div className="flex items-center justify-between">
                  <div>
                    <Text type="secondary" className="block text-xs">
                      {OVERVIEW_LABELS.totalSlots}
                    </Text>
                    <Text strong>{dc.totalSlots}</Text>
                  </div>
                  <div>
                    <Text type="secondary" className="block text-xs">
                      {OVERVIEW_LABELS.available}
                    </Text>
                    <Text strong className="text-emerald-600">
                      {dc.availableSlots}
                    </Text>
                  </div>
                  <div>
                    <Text type="secondary" className="block text-xs">
                      {OVERVIEW_LABELS.occupied}
                    </Text>
                    <Text strong className="text-red-500">
                      {dc.occupiedSlots}
                    </Text>
                  </div>
                </div>
                <div className="mt-3">
                  <Text type="secondary" className="block text-xs mb-1">
                    {OVERVIEW_LABELS.utilisation}
                  </Text>
                  <Progress percent={dc.utilisationPercent} status="active" size="small" />
                </div>
                <Text type="secondary" className="text-xs mt-2">
                  {OVERVIEW_LABELS.estTimeToFill}:{' '}
                  <Text strong>{Math.round(dc.predictedFillTimeMinutes)} mins</Text>
                </Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OverviewDcSection;
