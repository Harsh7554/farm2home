import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data || []);
      setFilteredProducts(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FILTER + SORT LOGIC (MAIN FIX)
  useEffect(() => {
    let updated = [...products];

    // 🔍 SEARCH
    if (search) {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📦 CATEGORY
    if (category !== "All") {
      updated = updated.filter((p) => p.category === category);
    }

    // 💰 SORT
    if (sort === "low") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [products, search, category, sort]);

  // 🛒 ADD TO CART
  const addToCart = async (productId) => {
    try {
      console.log("Adding",productId);
      
      await API.post("/cart", { productId, quantity: 1 });
      toast.success("Added To Cart 🛒"),{
        style:{
          borderRadius:"10px",
          background:"#16a34a",
          color:"fff",
        },
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add ❌")
    }
  };
return (
  <div className="px-3 sm:px-5 md:px-8 lg:px-12 py-5 pb-6">

    {/* 🔥 HEADING */}
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
      Fresh Products 🛒
    </h1>

    {/* 🔥 FILTER BAR */}
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur p-3 rounded-xl shadow-sm flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:flex-1 px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full sm:w-auto px-3 py-2 text-sm sm:text-base border rounded-lg"
      >
        <option value="All">All</option>
        <option value="Vegetable">Vegetable</option>
        <option value="Fruit">Fruit</option>
        <option value="Dairy">Dairy</option>
        <option value="Grains">Grains</option>
      </select>

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full sm:w-auto px-3 py-2 text-sm sm:text-base border rounded-lg"
      >
        <option value="">Sort</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>
    </div>

    {/* 🔥 PRODUCTS */}
    {filteredProducts.length === 0 ? (
      <div className="text-center py-16 text-gray-500">
        <h2 className="text-base sm:text-lg font-semibold">
          No products found 😢
        </h2>
      </div>
    ) : (

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">

        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
          >

           

            {/* 🏷 BADGE */}
            <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-2 py-[2px] rounded">
              Fresh
            </span>

            {/* IMAGE */}
            <div className="h-24 sm:h-32 md:h-36 overflow-hidden">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFO */}
            <div className="p-2 sm:p-3">

              <h2 className="text-xs sm:text-sm md:text-base font-semibold line-clamp-2">
                {product.name}
              </h2>

              <p className="text-green-600 font-bold text-xs sm:text-sm mt-1">
                ₹{product.price}
              </p>

              {/* 🔥 ACTION AREA */}
              <div className="mt-2 flex items-center justify-between gap-1">

                <button
                  onClick={() => addToCart(product._id)}
                  className="flex-1 bg-green-600 text-white text-[10px] sm:text-xs md:text-sm py-1.5 rounded-md hover:bg-green-700 active:scale-95 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}