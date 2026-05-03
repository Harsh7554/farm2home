import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Package, ShoppingCart, IndianRupee } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
  });

  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [topProduct, setTopProduct] = useState("");
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ dashboard stats
        const statsRes = await fetch("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const statsData = await statsRes.json();

        setStats(statsData);
        setTopProduct(statsData.topProduct);
        setLowStock(statsData.lowStock || []);

        // ✅ farmer orders
        const ordersRes = await fetch(
          "http://localhost:5000/api/orders/farmer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const ordersData = await ordersRes.json();
        setOrders(ordersData);

        // ✅ chart data
        const formatted = ordersData.map((order, i) => {
          const revenue = order.items.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
          }, 0);

          return {
            name: `#${i + 1}`,
            revenue,
          };
        });

        setChartData(formatted);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="ml-64 w-full">
          <div className="sticky top-0 z-10 bg-white shadow">
        {/* Topbar */}
        <Topbar title="Farmer Dashboard" />
</div>
        <div className="p-6">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome back 👋
            </h1>
            <p className="text-gray-500">
              Here's your farm performance overview 🌱
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            {["all", "today", "week", "month"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filter === f
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow">
              <div className="flex justify-between">
                <div>
                  <p>Total Products</p>
                  <h2 className="text-3xl font-bold">{stats.totalProducts}</h2>
                </div>
                <Package size={40} />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow">
              <div className="flex justify-between">
                <div>
                  <p>Total Orders</p>
                  <h2 className="text-3xl font-bold">{stats.totalOrders}</h2>
                </div>
                <ShoppingCart size={40} />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow">
              <div className="flex justify-between">
                <div>
                  <p>Total Earnings</p>
                  <h2 className="text-3xl font-bold">
                    ₹{stats.totalEarnings}
                  </h2>
                </div>
                <IndianRupee size={40} />
              </div>
            </div>

          </div>

          {/* Extra Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">

            {/* Top Product */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">
                Top Selling Product 🥇
              </h3>
              <p className="text-lg font-bold text-green-600">
                {topProduct || "No sales yet"}
              </p>
            </div>

            {/* Low Stock */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">
                Low Stock Alerts ⚠️
              </h3>
              {lowStock.length === 0 ? (
                <p className="text-gray-500">All good 👍</p>
              ) : (
                lowStock.map((item, i) => (
                  <p key={i} className="text-red-500 text-sm">
                    {item}
                  </p>
                ))
              )}
            </div>

          </div>

          {/* Chart + Orders */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            {/* Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Revenue Overview</h3>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Recent Orders</h3>

              <div className="space-y-3 max-h-[250px] overflow-y-auto">
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No orders yet
                  </p>
                ) : (
                  orders.slice(0, 5).map((order) => (
                    <div
                      key={order._id}
                      className="flex justify-between border-b pb-2"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          Order #{order._id.slice(-4)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.items.length} items
                        </p>
                      </div>

                      <span className="text-green-600 font-semibold">
                        ₹
                        {order.items.reduce((sum, item) => {
                          return (
                            sum +
                            item.productId.price * item.quantity
                          );
                        }, 0)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}