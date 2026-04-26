import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function MetricCard({ title, value, change, prefix = "", suffix = "", description }) {
  const positive = change > 0;
  const neutral  = change === 0;

  const trendClass = neutral ? "metric-flat" : positive ? "metric-up" : "metric-down";
  const TrendIcon  = neutral ? Minus : positive ? TrendingUp : TrendingDown;

  return (
    <div className="card hover:border-surface-700 transition-colors duration-150">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <span className={`flex items-center gap-1 text-xs font-medium ${trendClass}`}>
          <TrendIcon size={12} />
          {Math.abs(change)}%
        </span>
      </div>

      <p className="text-2xl font-semibold text-white mb-1">
        {prefix}{value}{suffix}
      </p>

      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
}