import React from 'react';
import clsx from 'clsx';

export function Table({
  columns,
  data = [],
  loading = false,
  emptyMessage = 'No data available',
  emptyStateComponent: EmptyState,
}) {
  return (
    <div className="w-full overflow-x-auto border border-borderDefault rounded-xl bg-bgSurface">
      <table className="w-full border-collapse text-left text-sm text-textSecondary">
        <thead className="bg-bgCard/40 border-b border-borderDefault text-xs uppercase tracking-wider text-textMuted font-bold font-dm">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-borderSubtle">
          {loading ? (
            // Skeleton Loader (5 rows)
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="animate-pulse">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4.5">
                    <div className="h-4 bg-bgCard rounded-md w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            // Empty State
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                {EmptyState ? (
                  EmptyState
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-textMuted font-medium">{emptyMessage}</span>
                  </div>
                )}
              </td>
            </tr>
          ) : (
            // Data Rows
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="hover:bg-white/[0.02] transition-colors duration-200"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4.5 text-textPrimary font-medium">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
