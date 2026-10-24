import React from 'react';
import { Info } from 'lucide-react';

interface DemoDataBadgeProps {
  label?: string;
  tooltip?: string;
  className?: string;
  compact?: boolean;
}

export const DemoDataBadge: React.FC<DemoDataBadgeProps> = ({
  label = 'DEMO DATA',
  tooltip = 'Simulated match data for preview. Modular architecture is ready for live Sports API feeds.',
  className = '',
  compact = false,
}) => {
  return (
    <span
      title={tooltip}
      className={`inline-flex items-center gap-1.5 font-semibold text-xs tracking-wider uppercase rounded border border-amber-500/40 bg-amber-500/10 text-amber-300 transition-colors ${
        compact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1'
      } ${className}`}
    >
      <Info className="w-3 h-3 text-amber-400" />
      <span>{label}</span>
    </span>
  );
};
