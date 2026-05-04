import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ FETCH ONLY MY PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  // ✅ OPEN EDIT
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/${editingProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingProduct),
      }
    );

    await res.json();
    setEditingProduct(null);
    fetchProducts();
  };

 return (
  <div className="flex min-h-screen bg-gray-100">

    {/* Sidebar */}
    <div className="hidden md:block">
      <Sidebar />
    </div>

    {/* Main Content */}
    <div className="flex-1 w-full p-4 sm:p-6 md:ml-64">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Products</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 shadow rounded-lg hover:shadow-md transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-32 sm:h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2 text-sm sm:text-base">
              {p.name}
            </h3>

            <p className="text-gray-700 text-sm sm:text-base">
              ₹{p.price}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 sm:flex-none bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="flex-1 sm:flex-none bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ✅ EDIT MODAL */}
    {editingProduct && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
        
        <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md">

          <h2 className="text-lg sm:text-xl mb-4 font-bold">
            Edit Product
          </h2>

          <input
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                name: e.target.value,
              })
            }
            className="border p-2 w-full mb-2 rounded"
            placeholder="Name"
          />

          <input
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: e.target.value,
              })
            }
            className="border p-2 w-full mb-2 rounded"
            placeholder="Price"
          />

          <input
            value={editingProduct.category}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                category: e.target.value,
              })
            }
            className="border p-2 w-full mb-2 rounded"
            placeholder="Category"
          />

          <input
            value={editingProduct.image}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                image: e.target.value,
              })
            }
            className="border p-2 w-full mb-4 rounded"
            placeholder="Image URL"
          />

          <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <button
              onClick={() => setEditingProduct(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-green-600"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    )}
  </div>
);
}