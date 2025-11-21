import React, { useEffect, useRef } from 'react';
import { Card, Typography } from 'antd';
import * as echarts from 'echarts';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import type { DashboardPredictionEntry } from 'services/dashboardApi';
import { useDashboardContext } from 'contexts/DashboardContext';

const { Title, Text } = Typography;

const DashboardAvailabilityChart: React.FC = () => {
  const { predictions } = useDashboardContext();
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const firstPoint = Array.isArray(params) ? params[0] : params;
          if (!firstPoint) return '';
          const point = firstPoint.data as DashboardPredictionEntry;
          return `${point.time}<br/>Available: ${point.available}<br/>Occupied: ${point.occupied}`;
        },
      },
      grid: { left: 48, right: 16, top: 24, bottom: 30 },
      xAxis: {
        type: 'category',
        data: predictions.map((point) => point.time),
        boundaryGap: false,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: (value) => Math.max(40, value.max + 5),
        splitLine: { show: true },
      },
      series: [
        {
          name: 'Available spots',
          type: 'line',
          smooth: true,
          data: predictions.map((point) => ({
            value: point.available,
            ...point,
          })),
          lineStyle: { color: '#22c55e', width: 3 },
          itemStyle: { color: '#22c55e' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(34,197,94,0.35)' },
              { offset: 1, color: 'rgba(34,197,94,0.05)' },
            ]),
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    const resize = () => chartInstance.current?.resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [predictions]);

  return (
    <Card
      bordered={false}
      className="rounded-2xl shadow-sm border border-gray-100 h-full min-h-[360px] flex flex-col"
    >
      <Title level={5} className="!mb-1">
        Predicted Availability
      </Title>
      <Text type="secondary" className="text-xs">
        Projected free slots for the next 2 hours
      </Text>
      <div ref={chartRef} style={{ height: 280, width: '100%', marginTop: 16 }} />
    </Card>
  );
};

export default DashboardAvailabilityChart;
