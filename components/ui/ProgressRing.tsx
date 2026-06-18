'use client';

interface ProgressRingProps {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  className?: string;
  showLabel?: boolean;
}

export default function ProgressRing({
  percent,
  size = 56,
  stroke = 3.5,
  color = '#5E6AD2',
  className = '',
  showLabel = true,
}: ProgressRingProps) {
  const r = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-[11px] font-bold text-white tabular-nums">
          {Math.round(percent)}%
        </span>
      )}
    </div>
  );
}
