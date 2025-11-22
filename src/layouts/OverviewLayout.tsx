// src/layouts/OverviewLayout.tsx
import React from 'react';
import { Typography, Row, Col } from 'antd';

const { Text } = Typography;

interface OverviewLayoutProps {
  children?: React.ReactNode[];
}

/**
 * OverviewLayout Component
 *
 * Handles the layout and grid structure for the Overview page.
 * Receives feature components as children and positions them in a responsive grid.
 *
 * Expected children order:
 * [0] - Summary Cards (KPIs)
 * [1] - DC Overview Section
 * [2] - Hourly Chart
 *
 * Layout Structure:
 * - Header (Title + Subtitle)
 * - Summary Cards (KPIs)
 * - Lower Section:
 *   - DC Overview Grid (left, 2/3 width)
 *   - Hourly Chart (right, 1/3 width)
 */
const OverviewLayout: React.FC<OverviewLayoutProps> = ({ children = [] }) => {
  const [summaryCards, dcSection] = children;

  return (
    <div className="px-6 py-4 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <Text type="secondary" className="text-xs">
            Live parking utilisation across Infy DCs with today&apos;s prediction
          </Text>
        </div>
      </div>

      {/* Summary Cards Section */}
      {summaryCards && <div className="summary-cards-section">{summaryCards}</div>}

      {/* Lower Grid Section: DC Overview + Hourly Chart */}
      <Row gutter={[24, 24]}>
        {/* Left Column: DC Overview (2/3 width) */}
        <Col xs={24} xl={16}>
          {dcSection && <div className="dc-section">{dcSection}</div>}
        </Col>
      </Row>
    </div>
  );
};

export default OverviewLayout;
