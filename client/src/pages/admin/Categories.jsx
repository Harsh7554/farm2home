import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 Fetch
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
        console.log(err);
        
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔥 Add
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      toast.success("Category added ✅");
      setName("");
      fetchCategories();

    } catch {
      toast.error("Error adding category");
    }
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Deleted 🗑️");
    fetchCategories();
  };

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:ml-64 min-h-screen bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">Categories 📦</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search categories..."
        className="mb-4 p-2 border rounded w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ➕ Add */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded shadow flex gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Category name"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button className="bg-green-600 text-white px-4 rounded hover:bg-green-700">
          Add
        </button>
      </form>

      {/* 📋 List */}
      <div className="bg-white rounded shadow">
        {filtered.map((c) => (
          <div
            key={c._id}
            className="flex justify-between items-center p-4 border-b hover:bg-gray-50"
          >
            <span>{c.name}</span>

            <button
              onClick={() => handleDelete(c._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}