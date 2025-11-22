import React from 'react';

interface CardProps {
  /**
   * Card title
   */
  title?: string | React.ReactNode;

  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Whether card is clickable/interactive
   */
  interactive?: boolean;

  /**
   * Hover effect
   */
  hoverable?: boolean;

  /**
   * Custom padding
   */
  padding?: string;

  /**
   * Extra styles
   */
  style?: React.CSSProperties;
}

/**
 * Card Component
 * Reusable card wrapper for content display
 *
 * Usage:
 * <Card title="Zone A">
 *   <p>Available: 10 slots</p>
 * </Card>
 */
const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  onClick,
  interactive = false,
  hoverable = true,
  padding = 'p-4',
  style,
}) => {
  const baseStyles =
    'bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200';
  const hoverStyles = hoverable ? 'hover:shadow-md hover:border-gray-300' : '';
  const interactiveStyles = interactive ? 'cursor-pointer hover:shadow-lg' : '';
  const combinedClassName =
    `${baseStyles} ${hoverStyles} ${interactiveStyles} ${padding} ${className}`.trim();

  return (
    <div className={combinedClassName} onClick={onClick} style={style}>
      {title && (
        <div className="mb-4">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
