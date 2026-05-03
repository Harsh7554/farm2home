import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data.items || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, []);

  // update quantity
  const updateQty = async (productId, qty) => {
    if (qty < 1) return;

    await API.put("/cart", { productId, quantity: qty });
    
  };

  // remove item
  const removeItem = async (productId) => {
    await API.delete(`/cart/${productId}`);
    
  };

  // total
  const total = cart.reduce(
    (sum, item) =>
      sum + (Number(item.productId?.price || 0) * item.quantity),
    0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
      
      {/* LEFT */}
      <div className="md:col-span-2 space-y-4">
        {cart.map((item) => (
          <div
            key={item.productId._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {item.productId?.name}
              </h2>
              <p className="text-gray-500">
                ₹{item.productId?.price}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity - 1)
                  }
                  className="px-2 bg-gray-200"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity + 1)
                  }
                  className="px-2 bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.productId._id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>

            <div className="font-bold text-green-600">
              ₹{item.productId?.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Taxes</span>
          <span>₹0</span>
        </div>

        <hr />

        <div className="flex justify-between mt-4 font-bold">
          <span>Total</span>
          <span className="text-green-600">₹{total}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Proceed to Checkout 🚀
        </button>
      </div>
    </div>
  );
}