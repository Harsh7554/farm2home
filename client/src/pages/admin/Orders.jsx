import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });

      // update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.log(err);
      alert("Error updating status ❌");
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <p className="p-6">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">📦 Manage Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-5 rounded-xl shadow"
              >
                {/* Order Info */}
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>

                  {/* ✅ FIXED STATUS DROPDOWN */}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="out_for_delivery">
                      Out for Delivery
                    </option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                {/* User */}
                <p className="text-sm">
                  User: {order.user?.email || "N/A"}
                </p>

                {/* Total */}
                <p className="text-green-600 font-semibold">
                  ₹{order.totalAmount}
                </p>

                {/* Items */}
                <div className="mt-3 space-y-1">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.productId?.name || "Product"}
                      </span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}