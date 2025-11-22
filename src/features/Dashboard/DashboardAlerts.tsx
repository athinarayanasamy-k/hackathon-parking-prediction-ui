import React from 'react';
import { Card, Typography } from 'antd';
import type { DashboardAlert } from 'services/dashboardApi';
import { useDashboardContext } from 'contexts/DashboardContext';

const { Title, Text } = Typography;

const severityMeta: Record<DashboardAlert['severity'], { label: string; classes: string }> = {
  critical: {
    label: 'Critical',
    classes: 'bg-red-50 border-red-100 text-red-700',
  },
  warning: {
    label: 'Warning',
    classes: 'bg-amber-50 border-amber-100 text-amber-700',
  },
  info: {
    label: 'Info',
    classes: 'bg-blue-50 border-blue-100 text-blue-700',
  },
  success: {
    label: 'Healthy',
    classes: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  },
};

const DashboardAlerts: React.FC = () => {
  const { alerts } = useDashboardContext();
  return (
    <Card
      bordered={false}
      className="rounded-2xl shadow-sm border border-gray-100 h-full min-h-[300px] flex flex-col"
    >
      <Title level={5} className="!mb-1">
        Live Alerts & Notifications
      </Title>
      <Text type="secondary" className="text-xs">
        Automated signals from AI models and sensors
      </Text>

      <div className="mt-4 space-y-3 flex-1">
        {alerts.map((alert) => {
          const meta = severityMeta[alert.severity];
          return (
            <div
              key={alert.id}
              className={`rounded-2xl border px-4 py-3 flex items-start gap-3 ${meta.classes}`}
            >
              <div className="rounded-xl bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide" aria-hidden="true">
                {meta.label}
              </div>
              <div>
                <Text strong className="block">
                  {alert.title}
                </Text>
                <Text className="block text-sm opacity-90">{alert.message}</Text>
                <Text type="secondary" className="text-xs">
                  {alert.timeAgo}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DashboardAlerts;
