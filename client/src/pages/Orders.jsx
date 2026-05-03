import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ❌ Cancel Order
const cancelOrder = async (id) => {
  try {
    await API.put(`/orders/cancel/${id}`);

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status: "cancelled" } : o
      )
    );
  } catch (err) {
    console.log(err);
    
    alert("Cancel failed ❌");
  }
};

  // ✅ STATUS COLOR (you already added — cleaned)
  const getStatusColor = (status) => {
    switch (status) {
      case "placed":
        return "bg-gray-200 text-gray-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "packed":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "out_for_delivery":
        return "bg-orange-100 text-orange-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-200";
    }
  };

  // ✅ TRACKING STEPS (correct)
  const steps = [
    "placed",
    "confirmed",
    "packed",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold">No Orders Yet 😢</h2>
          <p className="text-gray-500">
            Start shopping to see your orders here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const currentStep = steps.indexOf(order.status);

            return (
              <div
                key={order._id}
                className="bg-white p-5 rounded-xl shadow"
              >
                {/* ORDER HEADER */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.replaceAll("_", " ")}
                  </span>
                </div>
                 <p className="text-sm mt-1">
  Payment:{" "}
  <span
    className={
      order.paymentStatus === "paid"
        ? "text-green-600 font-semibold"
        : "text-red-500 font-semibold"
    }
  >
    {order.paymentStatus}
  </span>
</p>
                {/* TOTAL */}
                <p className="text-green-600 font-bold mt-2">
                  ₹{order.totalAmount}
                </p>

                {/* CANCEL BUTTON */}
{order.status !== "cancelled" &&
  !["shipped", "out_for_delivery", "delivered"].includes(order.status) && (
    <button
      onClick={() => cancelOrder(order._id)}
      className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
    >
      Cancel Order
    </button>
)}

                {/* ITEMS */}
                <div className="mt-3 border-t pt-3 space-y-1">
                  {order.items?.map((item, i) => (
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

                {/* 🔥 TRACKING BAR (FIXED CLEAN VERSION) */}
                <div className="mt-5">
                  {/* Labels */}
                  <div className="flex justify-between text-[10px] mb-1">
                    {steps.map((step) => (
                      <span key={step}>
                        {step.replaceAll("_", " ")}
                      </span>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center">
                    {steps.map((step, index) => {
                      const isActive = index <= currentStep;

                      return (
                        <div
                          key={index}
                          className={`flex-1 h-2 mx-1 rounded ${
                            isActive
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}