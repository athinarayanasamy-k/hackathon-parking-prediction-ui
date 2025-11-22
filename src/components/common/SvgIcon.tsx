import React from 'react';
import { ICON_COLORS, ICON_SIZES } from 'constants/Icons';

interface SvgIconProps {
  /**
   * Icon name/path - corresponds to icon from ICON_PATHS
   */
  name: string;

  /**
   * Icon size in pixels
   */
  size?: number;

  /**
   * Icon color - can be hex, rgb, or use predefined colors from ICON_COLORS
   */
  color?: string;

  /**
   * CSS class name for additional styling
   */
  className?: string;

  /**
   * Alt text for accessibility
   */
  alt?: string;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;

  /**
   * Whether icon is clickable
   */
  interactive?: boolean;

  /**
   * Rotation angle in degrees
   */
  rotate?: number;

  /**
   * Whether to flip the icon horizontally
   */
  flipX?: boolean;

  /**
   * Whether to flip the icon vertically
   */
  flipY?: boolean;

  /**
   * Stroke width
   */
  strokeWidth?: number;
}

/**
 * SvgIcon Component
 * Renders SVG icons with support for size, color, rotation, and flip transformations
 *
 * Usage:
 * <SvgIcon name="dashboard" size={24} color="#C4573B" />
 * <SvgIcon name="search" size={ICON_SIZES.MEDIUM} color={ICON_COLORS.PRIMARY} />
 */
const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  size = ICON_SIZES.MEDIUM,
  color = ICON_COLORS.MUTED,
  className = '',
  alt = `${name} icon`,
  onClick,
  interactive = false,
  rotate = 0,
  flipX = false,
  flipY = false,
  strokeWidth = 2,
}) => {
  const transform = [
    rotate !== 0 ? `rotate(${rotate})` : '',
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const cursorClass = interactive ? 'cursor-pointer hover:opacity-80' : '';
  const combinedClassName = `${className} ${cursorClass}`.trim();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={combinedClassName}
      onClick={onClick}
      style={{
        transform: transform || undefined,
        transition: 'all 0.2s ease',
      }}
      aria-label={alt}
      role="img"
    >
      {/* Icons are rendered as inline SVG paths based on the name */}
      {renderIcon(name)}
    </svg>
  );
};

/**
 * Helper function to render icon based on name
 * Using Feather Icons style SVG paths
 */
function renderIcon(name: string): React.ReactNode {
  switch (name) {
    // Navigation
    case 'home':
      return (
        <>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </>
      );
    case 'layers':
      return (
        <>
          <polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2" />
          <polyline points="2 7 12 12 22 7" />
          <polyline points="2 17 12 12 22 17" />
        </>
      );
    case 'map':
      return (
        <>
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </>
      );
    case 'calendar':
      return (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      );
    case 'bar-chart':
      return (
        <>
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </>
      );
    case 'bell':
      return (
        <>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </>
      );
    case 'settings':
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.96 2.96l4.24 4.24M1 12h6m6 0h6m-17.78 7.78l4.24-4.24m2.96-2.96l4.24-4.24" />
        </>
      );
    case 'search':
      return (
        <>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </>
      );
    case 'filter':
      return (
        <>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </>
      );
    case 'x':
      return (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      );
    case 'menu':
      return (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      );
    case 'log-out':
      return (
        <>
          <path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5m7-5l-5 5m5-5l-5-5" />
        </>
      );
    case 'user':
      return (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      );
    case 'chevron-left':
      return (
        <>
          <polyline points="15 18 9 12 15 6" />
        </>
      );
    case 'chevron-right':
      return (
        <>
          <polyline points="9 18 15 12 9 6" />
        </>
      );
    case 'chevron-up':
      return (
        <>
          <polyline points="18 15 12 9 6 15" />
        </>
      );
    case 'chevron-down':
      return (
        <>
          <polyline points="6 9 12 15 18 9" />
        </>
      );
    default:
      return <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />;
  }
}

export default SvgIcon;
