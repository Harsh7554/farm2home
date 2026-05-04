import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function Home() {
  const [products, setProducts] = useState([]);

  // 🔥 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

 

const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity: 1,
      }),
    });

    if (!res.ok) throw new Error();

    toast.success("Added to cart 🛒");

    // ✅ 🔥 THIS IS THE FIX
    window.dispatchEvent(new Event("cartUpdated"));

  } catch (err) {
    console.log(err);
    toast.error("Login required ❌");
  }
};

  return (
    <div className="bg-gray-50">

  {/* HERO SECTION */}
<section className="relative overflow-hidden bg-gradient-to-br from-[#f5fff5] via-[#fcfffc] to-[#eefbea]">

  {/* PREMIUM BACKGROUND BLURS */}
  <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-green-300/30 blur-3xl rounded-full"></div>

  <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-lime-200/30 blur-3xl rounded-full"></div>

  <div className="absolute top-[40%] left-[45%] w-[180px] h-[180px] bg-green-100/40 blur-3xl rounded-full"></div>

  {/* FLOATING ELEMENTS */}
  <div className="hidden lg:block absolute top-32 right-[42%] animate-bounce text-5xl opacity-20">
    🥦
  </div>

  <div className="hidden lg:block absolute bottom-24 left-[48%] animate-pulse text-4xl opacity-20">
    🍎
  </div>

  {/* MAIN CONTAINER */}
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 md:py-20 flex flex-col lg:flex-row items-center gap-14 relative z-10">

    {/* LEFT CONTENT */}
    <div className="flex-1 text-center lg:text-left">

      {/* TOP BADGE */}
      <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/50 text-green-700 px-5 py-2 rounded-full text-sm font-semibold shadow-lg mb-6">

        🌿 100% Organic & Farm Fresh

      </div>

      {/* HEADING */}
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1] tracking-tight text-gray-900">

        Fresh Food

        <br />

        <span className="text-green-600">
          Directly From
        </span>

        <br />

        Local Farmers

      </h1>

      {/* DESCRIPTION */}
      <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">

        Get farm-fresh vegetables, fruits, dairy products and organic essentials delivered directly to your doorstep with trusted quality and lightning-fast delivery.

      </p>

      {/* BUTTONS */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

        <Link to="/products">

          <button className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:-translate-y-1 hover:scale-105 transition duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">

            🛒 Shop Fresh Products

            <span className="group-hover:translate-x-1 transition">
              →
            </span>

          </button>

        </Link>

        <Link to="/about">

          <button className="bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-green-500 hover:text-green-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:-translate-y-1 transition duration-300 w-full sm:w-auto">

            Learn More

          </button>

        </Link>

      </div>

      {/* FEATURES */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">

        <div className="bg-white/80 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-white/50 hover:-translate-y-1 transition">

          ✅ 100% Organic

        </div>

        <div className="bg-white/80 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-white/50 hover:-translate-y-1 transition">

          🚚 Fast Delivery

        </div>

        <div className="bg-white/80 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-white/50 hover:-translate-y-1 transition">

          👨‍🌾 Trusted Farmers

        </div>

      </div>

      {/* STATS */}
      <div className="flex flex-wrap gap-10 mt-12 justify-center lg:justify-start">

        <div>
          <h2 className="text-4xl font-black text-green-600">
            10K+
          </h2>

          <p className="text-gray-500 mt-1">
            Happy Customers
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-black text-green-600">
            500+
          </h2>

          <p className="text-gray-500 mt-1">
            Trusted Farmers
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-black text-green-600">
            24/7
          </h2>

          <p className="text-gray-500 mt-1">
            Fast Delivery
          </p>
        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="flex-1 relative flex justify-center w-full">

      <div className="relative w-full max-w-[650px]">

        {/* MAIN IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop"
          alt="Fresh Vegetables"
          className=" brightness-110 contrast-105 w-full h-[350px] sm:h-[450px] md:h-[550px] object-cover rounded-[35px] shadow-[0_25px_80px_rgba(34,197,94,0.25)] hover:scale-[1.02] transition duration-500"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-[35px]"></div>

        {/* ORGANIC TAG */}
        <div className="absolute top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-2xl backdrop-blur-xl">

          🌱 Organic

        </div>

        {/* DELIVERY CARD */}
        <div className="absolute top-5 left-5 hidden sm:flex bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-2xl items-center gap-4 border border-white/50 hover:-translate-y-1 transition">

          <div className="text-3xl">
            🚚
          </div>

          <div>
            <h4 className="font-bold text-gray-800">
              Fast Delivery
            </h4>

            <p className="text-sm text-gray-500">
              Within 30 Minutes
            </p>
          </div>

        </div>

        {/* CUSTOMER CARD */}
        <div className="absolute bottom-5 left-5 hidden md:flex bg-white/80 backdrop-blur-xl px-5 py-4 rounded-3xl shadow-2xl border border-white/50 items-center gap-4">

          <div className="flex -space-x-3">

            <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white"></div>

            <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-white"></div>

            <div className="w-10 h-10 rounded-full bg-red-400 border-2 border-white"></div>

          </div>

          <div>

            <h4 className="font-bold text-gray-800">
              10K+ Customers
            </h4>

            <p className="text-sm text-gray-500">
              Trusted Across India 🇮🇳
            </p>

          </div>

        </div>

      </div>
    </div>

  </div>
</section>

      {/* 🔥 CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 border-t border-green-100">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
          Available Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Vegetables 🥦", "Fruits 🍎", "Dairy 🥛", "Grains 🌾"].map((cat, i) => (
           <div
  key={i}
  className="group bg-white rounded-3xl p-6 text-center border border-gray-100 hover:border-green-400 hover:shadow-xl transition duration-300 cursor-pointer hover:-translate-y-2"
>
  <div className="text-4xl mb-3">
    {cat.split(" ")[1]}
  </div>

  <h3 className="font-semibold text-lg text-gray-800">
    {cat.split(" ")[0]}
  </h3>
</div>
          ))}
        </div>
      </section>

      {/* 🔥 FEATURED PRODUCTS */}
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 bg-[#f8fff8] rounded-[40px] overflow-hidden border-t border-green-100">

  {/* HEADER */}
  <div className="flex items-center justify-between mb-8">

    <div>

      <p className="text-green-600 font-semibold text-sm sm:text-base">
        Fresh & Organic
      </p>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-1">
        Featured Products
      </h2>

    </div>

    <Link
      to="/products"
      className="text-green-600 font-semibold hover:text-green-700 transition text-sm sm:text-base"
    >

      View All →

    </Link>

  </div>

  {/* PRODUCT SLIDER + GRID */}
  <div
    id="slider"
    className="
      flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide
      sm:grid sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      sm:overflow-visible
    "
  >

    {products?.slice(0, 8).map((item) => (

      <div
        key={item._id}
        className="
          min-w-[260px] sm:min-w-0
          snap-start
          group bg-white rounded-[28px] overflow-hidden shadow-md hover:shadow-[0_20px_50px_rgba(34,197,94,0.18)]
          hover:shadow-2xl transition duration-300 hover:-translate-y-2
          border border-gray-100
        "
      >

        {/* IMAGE */}
        <div className="overflow-hidden relative">

          <img
            src={item.image}
            alt={item.name}
            className="h-52 sm:h-56 w-full object-cover group-hover:scale-110 transition duration-500"
          />

          {/* TAG */}
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">

            Fresh

          </div>

          {/* HEART */}
          <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-md w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition">

            ❤️

          </button>

        </div>

        {/* CONTENT */}
        <div className="p-5">

          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">

            {item.name}

          </h3>

          <p className="text-gray-500 text-sm mt-1">

            Farm Fresh Organic Product

          </p>

          {/* PRICE + RATING */}
          <div className="flex items-center justify-between mt-4">

            <p className="text-green-600 font-black text-2xl">

              ₹{item.price}

            </p>

            <div className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full font-semibold">

              ⭐ 4.8

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={() => addToCart(item._id)}
            className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-green-200 hover:-translate-y-1 transition duration-300"
          >

            Add to Cart

          </button>

        </div>

      </div>

    ))}

  </div>

</section>

      {/* 🔥 WHY CHOOSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-green-100 p-8 rounded-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Why Choose Us?
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "Organic 🌱",
              desc: "100% natural and pesticide-free products",
            },
            {
              title: "Fast Delivery 🚚",
              desc: "Quick delivery to your doorstep",
            },
            {
              title: "Best Price 💰",
              desc: "Direct farmer pricing, no middlemen",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 TESTIMONIALS */}
     <section className="bg-[#f8fff8] py-16 px-4 sm:px-6 overflow-hidden relative border-t border-green-100">

  {/* BACKGROUND BLUR */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/20 blur-3xl rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-200/20 blur-3xl rounded-full"></div>

  {/* HEADING */}
  <div className="text-center relative z-10">

    <div className="inline-flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full text-green-700 font-medium text-sm mb-4">

      💬 Customer Reviews

    </div>

    <h2 className="text-3xl sm:text-5xl font-black text-gray-900">

      What Our Customers Say

    </h2>

    <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">

      Trusted by thousands across India 🇮🇳 for fresh organic products and lightning-fast delivery.

    </p>

  </div>

  {/* TESTIMONIAL CARDS */}
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mt-14 relative z-10">

    {[
      {
        name: "Rahul Sharma",
        review:
          "Very fresh vegetables, delivery was quick and packaging was excellent.",
      },
      {
        name: "Priya Verma",
        review:
          "Prices are very reasonable and product quality is amazing.",
      },
      {
        name: "Amit Singh",
        review:
          "Best platform for organic food. Highly recommended!",
      },
    ].map((item, i) => (

      <div
        key={i}
        className="group bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-lg border border-white/40 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
      >

        {/* QUOTE ICON */}
        <div className="text-5xl text-green-100 font-black leading-none">
          "
        </div>

        {/* STARS */}
        <div className="flex items-center gap-1 text-yellow-400 text-lg mt-2">

          ⭐ ⭐ ⭐ ⭐ ⭐

        </div>

        {/* REVIEW */}
        <p className="text-gray-600 mt-5 leading-relaxed text-[15px]">

          {item.review}

        </p>

        {/* USER */}
        <div className="mt-8 flex items-center gap-4">

          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">

            {item.name.charAt(0)}

          </div>

          <div>

            <h4 className="font-semibold text-gray-800">

              {item.name}

            </h4>

            <p className="text-sm text-gray-500">

              Verified Customer

            </p>

          </div>

        </div>

      </div>

    ))}

  </div>

</section>

      {/* 🔥 DELIVERY BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">

  <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 rounded-[40px] p-8 sm:p-12 lg:p-16 shadow-[0_25px_80px_rgba(34,197,94,0.35)]">

    {/* BACKGROUND BLURS */}
    <div className="absolute top-[-80px] right-[-60px] w-72 h-72 bg-white/10 blur-3xl rounded-full"></div>

    <div className="absolute bottom-[-100px] left-[-60px] w-72 h-72 bg-lime-200/10 blur-3xl rounded-full"></div>

    {/* FLOATING ICONS */}
    <div className="hidden md:block absolute top-10 right-24 text-6xl opacity-10 animate-bounce">
      🥦
    </div>

    <div className="hidden md:block absolute bottom-8 left-24 text-5xl opacity-10 animate-pulse">
      🍎
    </div>

    {/* MAIN CONTENT */}
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

      {/* LEFT CONTENT */}
      <div className="text-center lg:text-left max-w-2xl">

        {/* SMALL BADGE */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">

          🚚 Fast & Free Delivery

        </div>

        {/* HEADING */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">

          Free Delivery
          <br />

          On Orders Above ₹499

        </h2>

        {/* DESCRIPTION */}
        <p className="mt-5 text-green-50 text-base sm:text-lg leading-relaxed">

          Fresh organic products delivered directly from trusted local farms to your doorstep with lightning-fast delivery.

        </p>

        {/* FEATURES */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">

          <div className="bg-white/15 backdrop-blur-lg px-4 py-2 rounded-2xl text-sm border border-white/10">

            ⚡ 30 Min Delivery

          </div>

          <div className="bg-white/15 backdrop-blur-lg px-4 py-2 rounded-2xl text-sm border border-white/10">

            🌱 100% Organic

          </div>

          <div className="bg-white/15 backdrop-blur-lg px-4 py-2 rounded-2xl text-sm border border-white/10">

            💚 Trusted Farmers

          </div>

        </div>

      </div>

      {/* RIGHT BUTTON */}
      <div className="flex flex-col items-center gap-4">

        <Link to="/products">

          <button className="group bg-white hover:bg-gray-100 text-green-600 px-8 sm:px-10 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 hover:-translate-y-1 transition duration-300 flex items-center gap-2">

            Shop Now

            <span className="group-hover:translate-x-1 transition">
              →
            </span>

          </button>

        </Link>

        <p className="text-green-100 text-sm">

          No hidden delivery charges

        </p>

      </div>

    </div>

  </div>

</section>

    </div>
  );
}