import { useWishlist } from "../context/WishlistContext";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data || []);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) =>
      wishlist.includes(p._id)
    );
    setWishlistItems(filtered);
  }, [products, wishlist]);

  console.log("wishlist:", wishlist); // 🔥 DEBUG

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">❤️ Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">No wishlist items 😢</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <div key={item._id} className="border p-3 rounded">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}