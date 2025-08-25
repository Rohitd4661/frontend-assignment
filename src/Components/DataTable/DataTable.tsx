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
    return <div className="text-center py-6 text-gray-500">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-6 text-gray-400">No data available</div>;
  }

  return (
    <div className="w-4/5 mx-auto mt-6 p-6 rounded-2xl bg-[#e0e5ec] shadow-[9px_9px_16px_#a3b1c6,-9px_-9px_16px_#ffffff]">
      <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">Data Table</h2>

      <table className="w-full border-separate border-spacing-0 text-base bg-[#e0e5ec] rounded-xl overflow-hidden shadow-inner shadow-[inset_6px_6px_10px_#a3b1c6,inset_-6px_-6px_10px_#ffffff]">
        <thead>
          <tr>
            {selectable && <th className=""></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={`px-4 py-3 bg-[#dce2ec] text-gray-900 font-semibold text-left border-b-2 border-gray-300 cursor-pointer ${
                  col.sortable ? "hover:bg-gray-300" : ""
                }`}
              >
                {col.title}
                {sortKey === col.key && (sortOrder === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id} className="transition-colors duration-200 hover:bg-gray-100">
              {selectable && (
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(row)}
                    onChange={() => toggleRow(row)}
                    className="transform scale-125 cursor-pointer"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 border-b border-gray-300 text-gray-800">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

