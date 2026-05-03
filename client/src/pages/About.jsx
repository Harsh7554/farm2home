export default function About() {
  return (
    <div className="w-full">

      {/* 🔥 HERO SECTION */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] flex items-center justify-center text-center">
        
        <img
          src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg"
          alt="Farm"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-white px-4 sm:px-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3">
            From Farms to Your Home 🌾
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-200">
            We connect farmers directly with customers to deliver fresh,
            organic, and affordable produce.
          </p>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* 🧾 STORY SECTION */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-14">

          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            alt="Farmers"
            className="rounded-2xl shadow-lg w-full h-60 sm:h-80 md:h-full object-cover"
          />

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              Our Story 📖
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              Farm2Home was created to bridge the gap between farmers and
              consumers. Farmers often struggle to get fair prices, while
              customers don’t always receive fresh produce.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our platform eliminates middlemen, ensuring better income for
              farmers and healthier food for you.
            </p>
          </div>

        </div>

        {/* 🌟 FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mb-14">
          {[
            {
              title: "Fresh & Organic",
              desc: "Directly sourced from farms without chemicals",
              icon: "🌱",
            },
            {
              title: "Fair Pricing",
              desc: "No middlemen, better prices for all",
              icon: "💰",
            },
            {
              title: "Fast Delivery",
              desc: "Delivered fresh to your doorstep",
              icon: "🚚",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-base sm:text-lg font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center mb-14">
          {[
            { value: "500+", label: "Farmers" },
            { value: "10K+", label: "Customers" },
            { value: "50+", label: "Products" },
            { value: "100%", label: "Fresh" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-green-50 p-4 sm:p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700">
                {item.value}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* ⚙️ HOW IT WORKS */}
        <div className="mb-14">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 text-green-700">
            How It Works ⚙️
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                step: "🌾",
                title: "Harvest",
                desc: "Farmers harvest fresh produce",
              },
              {
                step: "📦",
                title: "Pack",
                desc: "We ensure hygienic packaging",
              },
              {
                step: "🚚",
                title: "Deliver",
                desc: "Delivered directly to you",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white shadow hover:shadow-md transition text-center"
              >
                <div className="text-3xl mb-2">{item.step}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🚀 CTA */}
        <div className="bg-green-600 text-white text-center py-10 sm:py-12 px-4 rounded-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            Support Farmers. Eat Fresh. 💚
          </h2>
          <p className="mb-4 text-sm sm:text-base">
            Join thousands of happy customers today.
          </p>

          <button className="bg-white text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
            Explore Products
          </button>
        </div>

      </div>
    </div>
  );
}