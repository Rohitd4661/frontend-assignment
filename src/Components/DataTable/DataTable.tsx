import React, { useState } from "react";
import "./DataTable.css"; // import css file

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];                     
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(col.key);
      setSortOrder("asc");
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const valA = a[sortKey as keyof T];
        const valB = b[sortKey as keyof T];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : data;

  const toggleRow = (row: T) => {
    if (!selectable) return;
    let updated: T[];
    if (selected.includes(row)) {
      updated = selected.filter((r) => r !== row);
    } else {
      updated = [...selected, row];
    }
    setSelected(updated);
    onRowSelect?.(updated);
  };

  if (loading) {
    return <div className="datatable-loading">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="datatable-empty">No data available</div>;
  }

  return (
    <table className="datatable">
      <thead>
        <tr>
          {selectable && <th className="datatable-header"></th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col)}
              className={`datatable-header ${col.sortable ? "sortable" : ""}`}
            >
              {col.title}
              {sortKey === col.key && (sortOrder === "asc" ? "🔼" : "🔽")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id} className="datatable-row">
            {selectable && (
              <td className="datatable-cell">
                <input
                  type="checkbox"
                  checked={selected.includes(row)}
                  onChange={() => toggleRow(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="datatable-cell">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
