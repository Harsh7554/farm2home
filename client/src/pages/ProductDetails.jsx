import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch single product
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // 🛒 Add to cart
  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });
      alert("Added to cart 🛒");
    } catch (err) {
      console.log(err);
      alert("Login required ❌");
    }
  };

  // 🔄 Loading
  if (loading) {
    return <p className="p-6">Loading product...</p>;
  }

  if (!product) {
    return <p className="p-6 text-red-500">Product not found ❌</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

        {/* 🖼 Image */}
        <div>
          <img
            src={
              product.image ||
              "https://images.unsplash.com/photo-1582515073490-dc68d3b8a6d2"
            }
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* 📄 Details */}
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            {product.name}
          </h1>

          {/* Category */}
          {product.category && (
            <span className="inline-block mt-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
              {product.category}
            </span>
          )}

          {/* Price */}
          <p className="text-2xl font-bold text-green-600 mt-4">
            ₹{product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 mt-4">
            {product.description || "No description available."}
          </p>

          {/* Stock */}
          <p className="mt-2 text-sm text-gray-500">
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          {/* Add to Cart */}
          <button
            onClick={addToCart}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add to Cart 🛒
          </button>

          {/* Farmer Info */}
          {product.farmerId && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Farmer Info 👨‍🌾</h3>
              <p>Name: {product.farmerId.name}</p>
              <p>Email: {product.farmerId.email}</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}