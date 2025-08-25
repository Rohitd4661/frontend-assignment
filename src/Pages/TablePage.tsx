import React from "react";
// import { DataTable } from "../components/DataTable";
// import "../../DataTable/DataTable.css";
import'../Components/DataTable/DataTable.css';
import { DataTable } from "../Components/DataTable/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  phone: any;
}

// Generate 8 users
const data: User[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  phone: `985634452${i + 1}`,
}));

export default function TablePage() {
  return (
    <div className="datatable-container">
      <h2 className="datatable-title">Data Table Demo</h2>
      <DataTable<User>
        data={data}
        columns={[
          { key: "name", title: "Name", dataIndex: "name", sortable: true },
          { key: "email", title: "Email", dataIndex: "email", sortable: true },
          { key: "phone", title: "Phone", dataIndex: "phone", sortable: true },
        ]}
        selectable
      />
    </div>
  );
}
