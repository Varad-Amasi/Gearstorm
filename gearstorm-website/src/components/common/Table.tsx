import { clsx } from 'clsx';
import { useMemo, useState, type ReactNode } from 'react';

export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn<T> {
  /** Property used to read the cell value and identify the column. */
  key: keyof T & string;
  label: string;
  /** Custom cell renderer; falls back to the stringified value. */
  render?: (row: T) => ReactNode;
  align?: TableAlign;
  sortable?: boolean;
  /** Extra classes applied to the column's cells (e.g. width utilities). */
  className?: string;
}

export interface TableProps<T> {
  data: readonly T[];
  columns: readonly TableColumn<T>[];
  rowKey: keyof T & string;
  caption?: string;
  emptyMessage?: string;
  /** Rows per page. Omit to render every row without pagination. */
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

type SortDirection = 'asc' | 'desc';

interface SortState<T> {
  key: keyof T & string;
  direction: SortDirection;
}

const ALIGN_CLASSES: Record<TableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const compareValues = (a: unknown, b: unknown): number => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b);
  }
  return String(a ?? '').localeCompare(String(b ?? ''), undefined, {
    numeric: true,
  });
};

/**
 * Generic data table with optional column sorting and pagination. Scrolls
 * horizontally on small screens rather than collapsing columns.
 */
export const Table = <T,>({
  data,
  columns,
  rowKey,
  caption,
  emptyMessage = 'No data available.',
  pageSize,
  onRowClick,
}: TableProps<T>): JSX.Element => {
  const [sort, setSort] = useState<SortState<T> | null>(null);
  const [page, setPage] = useState(0);

  const sortedData = useMemo(() => {
    if (!sort) {
      return data;
    }
    const factor = sort.direction === 'asc' ? 1 : -1;
    return [...data].sort(
      (a, b) => compareValues(a[sort.key], b[sort.key]) * factor
    );
  }, [data, sort]);

  const pageCount = pageSize ? Math.ceil(sortedData.length / pageSize) : 1;
  const safePage = Math.min(page, Math.max(pageCount - 1, 0));
  const visibleRows = pageSize
    ? sortedData.slice(safePage * pageSize, safePage * pageSize + pageSize)
    : sortedData;

  const toggleSort = (key: keyof T & string): void => {
    setPage(0);
    setSort((current) => {
      if (current?.key !== key) {
        return { key, direction: 'asc' };
      }
      return current.direction === 'asc' ? { key, direction: 'desc' } : null;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="bg-dark-800">
            <tr>
              {columns.map((column) => {
                const isSorted = sort?.key === column.key;
                const alignClass = ALIGN_CLASSES[column.align ?? 'left'];

                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      isSorted
                        ? sort.direction === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : column.sortable
                          ? 'none'
                          : undefined
                    }
                    className={clsx(
                      'px-4 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-text-muted',
                      alignClass,
                      column.className
                    )}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(column.key)}
                        className="inline-flex items-center gap-1.5 rounded transition-colors duration-normal hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      >
                        {column.label}
                        <span aria-hidden="true" className="text-xs">
                          {isSorted
                            ? sort.direction === 'asc'
                              ? '▲'
                              : '▼'
                            : '↕'}
                        </span>
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              visibleRows.map((row) => (
                <tr
                  key={String(row[rowKey])}
                  {...(onRowClick
                    ? {
                        onClick: () => onRowClick(row),
                        tabIndex: 0,
                        role: 'button',
                        onKeyDown: (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onRowClick(row);
                          }
                        },
                      }
                    : {})}
                  className={clsx(
                    'border-t border-border transition-colors duration-normal even:bg-dark-800/40',
                    onRowClick &&
                      'cursor-pointer hover:bg-dark-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40'
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={clsx(
                        'px-4 py-3 text-text-light',
                        ALIGN_CLASSES[column.align ?? 'left'],
                        column.className
                      )}
                    >
                      {column.render
                        ? column.render(row)
                        : String(row[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageSize && pageCount > 1 ? (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-text-muted" aria-live="polite">
            Page {safePage + 1} of {pageCount}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(current - 1, 0))}
              disabled={safePage === 0}
              className="rounded-lg border border-border px-3 py-2 text-sm text-text-light transition-colors duration-normal hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(current + 1, pageCount - 1))
              }
              disabled={safePage >= pageCount - 1}
              className="rounded-lg border border-border px-3 py-2 text-sm text-text-light transition-colors duration-normal hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
