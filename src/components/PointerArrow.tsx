import React from 'react';
import { cn } from '@/lib/utils';

interface PointerArrowProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  label: string;
  className?: string;
}

export const PointerArrow: React.FC<PointerArrowProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  label,
  className = ''
}) => {
  // Only show head and tail pointers, not next/prev
  if (!['head', 'tail'].includes(label)) {
    return null;
  }

  const labelX = (fromX + toX) / 2;
  const labelY = Math.min(fromY, toY) - 10;

  return (
    <g className={cn("pointer-arrow", className)}>
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke="currentColor"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        className="text-xs font-medium fill-current"
        style={{ fontSize: '12px' }}
      >
        {label}
      </text>
    </g>
  );
};