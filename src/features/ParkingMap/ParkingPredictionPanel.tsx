import React from 'react';
import { Button, Card, DatePicker, Progress, Space, TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import type { ParkingPredictionSummary } from 'services/parkingMapApi';
import { useParkingMapContext } from 'contexts/ParkingMapContext';

const { Title, Text } = Typography;

const ParkingPredictionPanel: React.FC = () => {
  const { predictionSummary: summary } = useParkingMapContext();
  const [date, setDate] = React.useState(dayjs());
  const [startTime, setStartTime] = React.useState(dayjs('09:00', 'HH:mm'));
  const [endTime, setEndTime] = React.useState(dayjs('18:00', 'HH:mm'));
  const [predicted, setPredicted] = React.useState<ParkingPredictionSummary | null>(summary);

  React.useEffect(() => {
    setPredicted(summary);
  }, [summary]);

  const handlePredict = () => {
    setPredicted({ ...summary });
  };

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card
        bordered={false}
        style={{
          borderRadius: 24,
          border: '1px solid #e0e7ff',
          boxShadow: '0 20px 35px rgba(79,70,229,0.12)',
        }}
      >
        <Title level={5} style={{ marginBottom: 16 }}>
          Occupancy Prediction
        </Title>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <DatePicker value={date} onChange={(d) => d && setDate(d)} style={{ width: '100%' }} />
          <div style={{ display: 'flex', gap: 12 }}>
            <TimePicker
              value={startTime}
              onChange={(t) => t && setStartTime(t)}
              format="hh:mm A"
              style={{ flex: 1 }}
            />
            <TimePicker
              value={endTime}
              onChange={(t) => t && setEndTime(t)}
              format="hh:mm A"
              style={{ flex: 1 }}
            />
          </div>
          <Button type="primary" block size="large" onClick={handlePredict}>
            Get Prediction
          </Button>
        </Space>

        {predicted && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Text type="secondary">Predicted Occupancy</Text>
            <Title level={3} style={{ margin: '4px 0', color: '#4f46e5' }}>
              {predicted.predictedOccupancyPercent}%
            </Title>
            <Progress
              percent={predicted.predictedOccupancyPercent}
              showInfo={false}
              strokeColor={{ from: '#4f46e5', to: '#06b6d4' }}
              trailColor="#e2e8f0"
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 12,
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#059669' }}>Available: {predicted.available}</span>
              <span style={{ color: '#dc2626' }}>Occupied: {predicted.occupied}</span>
            </div>
            <Text type="secondary" style={{ display: 'block', marginTop: 8, fontSize: 12 }}>
              {date.format('MMM DD, YYYY')} - {startTime.format('hh:mm A')} to{' '}
              {endTime.format('hh:mm A')}
            </Text>
          </div>
        )}
      </Card>

      {/* <Card
        bordered={false}
        style={{
          borderRadius: 24,
          border: '1px solid #f1f5f9',
          boxShadow: '0 16px 30px rgba(15,23,42,0.08)',
        }}
      >
        <Title level={5} style={{ marginBottom: 16 }}>
          Full-Time Occupancy Forecast
        </Title>
        <Space direction="vertical" size={14} style={{ width: '100%' }}>
          {forecast.map((entry) => (
            <div key={entry.time} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Text style={{ width: 80 }}>{entry.time}</Text>
              <div style={{ flex: 1, background: '#e2e8f0', borderRadius: 999, height: 14 }}>
                <div
                  style={{
                    width: `${entry.occupancyPercent}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)',
                  }}
                />
              </div>
              <Text strong style={{ width: 48, textAlign: 'right' }}>
                {entry.occupancyPercent}%
              </Text>
            </div>
          ))}
        </Space>
      </Card> */}
    </Space>
  );
};

export default ParkingPredictionPanel;
