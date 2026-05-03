import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
];

const Dashboard = () => {
  return (
    <div className="p-5 bg-gray-100 min-h-screen">

      {/* 🔹 CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

        <div className="bg-blue-500 text-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-sm">Users</p>
          <h2 className="text-2xl font-bold">9</h2>
          <span className="text-green-200 text-sm">+12%</span>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-sm">Products</p>
          <h2 className="text-2xl font-bold">17</h2>
          <span className="text-green-200 text-sm">+8%</span>
        </div>

        <div className="bg-orange-500 text-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-sm">Orders</p>
          <h2 className="text-2xl font-bold">0</h2>
          <span className="text-red-200 text-sm">-2%</span>
        </div>

        <div className="bg-purple-500 text-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-sm">Revenue</p>
          <h2 className="text-2xl font-bold">₹0</h2>
          <span className="text-green-200 text-sm">+0%</span>
        </div>

      </div>

      {/* 🔹 CHART */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 TABLE */}
      <div className="bg-white p-5 rounded-xl shadow overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">#123</td>
              <td className="p-3">Harsh</td>
              <td className="p-3 text-green-600 font-medium">Delivered</td>
              <td className="p-3">₹500</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">#124</td>
              <td className="p-3">Amit</td>
              <td className="p-3 text-yellow-600 font-medium">Pending</td>
              <td className="p-3">₹300</td>
            </tr>

            <tr>
              <td className="p-3">#125</td>
              <td className="p-3">Rahul</td>
              <td className="p-3 text-red-600 font-medium">Cancelled</td>
              <td className="p-3">₹200</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;