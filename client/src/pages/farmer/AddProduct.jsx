import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import toast from "react-hot-toast";
export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: ""
  });3
  

const handleSubmit = async (e) => {
  e.preventDefault(); // 🚨 VERY IMPORTANT

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        category: form.category,
        image: form.image,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed");
      return;
    }
    toast.success("Product Added Successfully ✅");

  } catch (err) {
    console.log(err);
    toast.error("Something went wrong ❌");
  }
};

return (
  <div className="flex min-h-screen bg-gray-100">
    
    {/* Sidebar */}
    <div className="hidden md:block">
      <Sidebar />
    </div>

    {/* Main Content */}
    <div className="flex-1 w-full p-4 sm:p-6 md:ml-64">
      
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6">
        
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          🛒 Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Product Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Price"
            type="number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Category"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            placeholder="Image URL"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          {/* Image Preview */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-full h-32 sm:h-40 object-cover rounded-lg border"
            />
          )}

          <textarea
            placeholder="Description"
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            placeholder="Stock"
            type="number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-md"
          >
            🚀 Add Product
          </button>

        </form>
      </div>
    </div>
  </div>
);
}