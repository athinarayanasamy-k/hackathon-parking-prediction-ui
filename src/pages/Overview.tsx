// src/pages/Overview.tsx
import React from 'react';
import { Spin, Alert } from 'antd';
import { useGetOverviewQuery, type OverviewResponse } from 'services/parkingApi';
import { OverviewSummaryCards } from 'features/Overview/OverviewSummaryCards';
import OverviewLayout from 'layouts/OverviewLayout';
import OverviewDcSection from 'features/Overview/OverviewDcSection';
import { OverviewProvider } from 'contexts/OverviewContext';

const OverviewPage: React.FC = () => {
  const { data, isLoading, isError, error } = useGetOverviewQuery();

  const overview: OverviewResponse | undefined = data;

  if (isLoading && !overview) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (isError && !overview) {
    return (
      <div className="p-6">
        <Alert
          type="error"
          message="Failed to load overview"
          description={JSON.stringify(error)}
          showIcon
        />
      </div>
    );
  }

  if (!overview) return null;

  return (
    <OverviewProvider overview={overview}>
      <OverviewLayout>
        <OverviewSummaryCards />
        <OverviewDcSection />
      </OverviewLayout>
    </OverviewProvider>
  );
};

export default OverviewPage;
