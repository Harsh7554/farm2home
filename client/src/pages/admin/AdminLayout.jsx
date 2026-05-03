import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64 p-6 bg-grey-100 w-full">

        {/* Topbar */}
        <AdminTopbar />

        {/* Page Content */}
        <div className="p-5">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;