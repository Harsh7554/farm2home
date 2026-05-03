export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-4">

      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded hover:scale-105 transition duration-300"
      />

      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-green-600 font-bold">₹{product.price}</p>

      <button className="mt-2 w-full bg-green-600 text-white py-1 rounded hover:bg-green-700">
        Add to Cart
      </button>

    </div>
  );
}