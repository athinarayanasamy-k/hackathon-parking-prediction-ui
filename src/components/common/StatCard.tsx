import React from 'react';
import SvgIcon from './SvgIcon';
import { ICON_COLORS, ICON_SIZES } from 'constants/Icons';

interface StatCardProps {
  /**
   * Statistic label/title
   */
  label: string;

  /**
   * Statistic value
   */
  value: string | number;

  /**
   * Icon name
   */
  icon?: string;

  /**
   * Icon color
   */
  iconColor?: string;

  /**
   * Background color for icon section
   */
  bgColor?: string;

  /**
   * Subtitle or description
   */
  subtitle?: string;

  /**
   * Whether to show percentage change
   */
  showTrend?: boolean;

  /**
   * Trend percentage
   */
  trend?: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * StatCard Component
 * Displays a statistic with icon and optional trend
 *
 * Usage:
 * <StatCard
 *   label="Available Slots"
 *   value="45"
 *   icon="home"
 *   iconColor="#22c55e"
 *   bgColor="bg-green-50"
 *   trend={+5}
 * />
 */
const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconColor = ICON_COLORS.PRIMARY,
  bgColor = 'bg-blue-50',
  subtitle,
  showTrend = false,
  trend = 0,
  className = '',
  onClick,
}) => {
  const trendColor = trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600';
  const trendIcon = trend > 0 ? '↑' : trend < 0 ? '↓' : '';

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${className}`.trim()}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {showTrend && (
              <span className={`text-sm font-semibold ${trendColor}`}>
                {trendIcon}
                {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`${bgColor} rounded-lg p-3 ml-4`}>
            <SvgIcon name={icon} color={iconColor} size={ICON_SIZES.MEDIUM} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
