import { useEffect, useState } from "react";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";
export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  <Toaster position="top-right"/>
  // ✅ Address state
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // ✅ Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get("/cart");
        setCart(data.items || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ✅ Calculate totals
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal + delivery;

  // ✅ Payment Handler
  const handlePayment = async () => {
    try {
      // 🔴 Basic validation
      if (
        !address.fullName ||
        !address.phone ||
        !address.addressLine ||
        !address.city ||
        !address.state ||
        !address.pincode
      ) {
        return alert("Please fill all address fields");
      }

      // 1️⃣ Create order
      const { data } = await API.post("/payment/create-order", {
        address,
      });

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyRes = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              address, // ✅ send address again
            });

           if (verifyRes.data.success) {
  toast.success("Payment Successful 🎉", {
    style: {
      borderRadius: "10px",
      background: "#16a34a",
      color: "#fff",
    },
  });

  setTimeout(() => {
    window.location.href = "/orders";
  }, 1500); // small delay to show toast
} else {
  toast.error("Payment verification failed ❌");
}
          } catch (err) {
            console.log(err);
            toast.error("Verification error ❌")
          }
        },

        prefill: {
          name: address.fullName,
          contact: address.phone,
        },

        theme: {
          color: "#16a34a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("❌ Payment failed");
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

 return (
  <div className="min-h-screen bg-gray-100 py-8 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

      {/* LEFT SECTION */}
      <div className="md:col-span-2 space-y-6">

        {/* ADDRESS CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            📍 Delivery Address
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Full Name"
              value={address.fullName}
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />

            <input
              className="input md:col-span-2"
              placeholder="Street Address"
              value={address.addressLine}
              onChange={(e) =>
                setAddress({ ...address, addressLine: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>
        </div>

        {/* CART CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🛒 Your Cart
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-3 border-b last:border-none"
              >
                <div>
                  <p className="font-medium">
                    {item.productId?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{item.productId?.price} × {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.productId?.price * item.quantity}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit sticky top-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery</span>
            <span>
              {delivery === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `₹${delivery}`
              )}
            </span>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-medium shadow"
        >
          Pay Now
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          🔒 Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  </div>
);
}