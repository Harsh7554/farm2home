import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
      
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await fetch(`http://localhost:5000/api/products/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });

        toast.success("Product updated ✅");
      } else {
        await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });

        toast.success("Product added 🛒");
      }

      setForm({ name: "", price: "", image: "" });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error("Something went wrong ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Deleted successfully 🗑️");
    fetchProducts();
  };

  // EDIT
  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      image: p.image,
    });
    setEditId(p._id);
  };

  // FILTER
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold">Manage Products 🛒</h1>
          <p className="text-gray-500 text-sm">Add, edit and manage products easily</p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-xl shadow-md mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <button className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* TABLE CARD */}
      <div className="bg-white p-5 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">

          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr
                key={p._id}
                className="bg-gray-50 hover:bg-gray-100 transition rounded-lg shadow-sm"
              >
                <td className="p-2">
                  <img
                    src={p.image || "https://via.placeholder.com/50"}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>

                <td className="p-2 font-medium">{p.name}</td>
                <td className="p-2 text-green-600 font-semibold">₹{p.price}</td>

                <td className="p-2 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}