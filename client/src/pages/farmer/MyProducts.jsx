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
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-6">My Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 shadow rounded">
              <img src={p.image} className="h-40 w-full object-cover" />

              <h3 className="font-bold mt-2">{p.name}</h3>
              <p>₹{p.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">

            <h2 className="text-xl mb-4 font-bold">Edit Product</h2>

            <input
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />

            <input
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />

            <input
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />

            <input
              value={editingProduct.image}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  image: e.target.value,
                })
              }
              className="border p-2 w-full mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
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