import React from 'react';
import clsx from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({
  title,
  value,
  icon: Icon,
  iconBg = 'bg-primary/10 text-primary',
  trend,
  className,
}) {
  return (
    <div className={clsx('glass-card p-6 rounded-xl flex items-center justify-between shadow-cardGlow gap-4 transition-all duration-200 hover:border-primary/20', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">{title}</span>
        <span className="text-3xl font-bold font-syne text-textPrimary tracking-tight select-none">
          {value}
        </span>
        {trend && (
          <div className="flex items-center gap-1 mt-1 text-xs">
            {trend.positive ? (
              <span className="flex items-center font-semibold text-success gap-0.5">
                <TrendingUp size={12} /> {trend.value}%
              </span>
            ) : (
              <span className="flex items-center font-semibold text-danger gap-0.5">
                <TrendingDown size={12} /> {trend.value}%
              </span>
            )}
            <span className="text-textMuted font-medium">vs last month</span>
          </div>
        )}
      </div>

      {Icon && (
        <div className={clsx('flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 border border-white/5', iconBg)}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
}
