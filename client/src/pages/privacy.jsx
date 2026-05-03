import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f6fff6] via-white to-[#f8fff8]">

      {/* BACKGROUND BLURS */}
      <div className="absolute top-0 left-0 w-60 sm:w-96 h-60 sm:h-96 bg-green-200/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-60 sm:w-96 h-60 sm:h-96 bg-lime-200/20 blur-3xl rounded-full"></div>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16 text-center">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-green-100 text-green-700 px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm shadow-lg mb-6">

          🔒 Privacy & Security

        </div>

        {/* HEADING */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">

          Privacy Policy

        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 sm:mt-8 text-gray-600 text-sm sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2">

          At Farm2Home, your privacy and security are our top priorities.
          We are committed to protecting your personal information and ensuring
          a safe shopping experience for every customer.

        </p>

        {/* UPDATED */}
        <p className="mt-4 text-xs sm:text-sm text-gray-500">

          Last Updated: {new Date().toLocaleDateString()}

        </p>

        {/* TRUST BADGES */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">

          <div className="bg-white/70 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-md border border-white/50 text-xs sm:text-sm">

            🔒 Secure Payments

          </div>

          <div className="bg-white/70 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-md border border-white/50 text-xs sm:text-sm">

            🛡 Data Protection

          </div>

          <div className="bg-white/70 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-md border border-white/50 text-xs sm:text-sm">

            🌱 Trusted Platform

          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">

        {/* TOP BANNER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 text-white shadow-[0_25px_80px_rgba(34,197,94,0.25)] mb-10 sm:mb-12">

          <div className="absolute top-[-50px] right-[-50px] w-52 sm:w-64 h-52 sm:h-64 bg-white/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-5">

              🔐 Your Privacy Matters

            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">

              Keeping Your
              <br />

              Information Safe

            </h2>

            <p className="mt-5 text-green-50 text-sm sm:text-lg max-w-2xl leading-relaxed">

              We ensure that your personal information remains secure and is only used to provide a seamless and personalized shopping experience.

            </p>

          </div>

        </div>

        {/* POLICY CARDS */}
        <div className="space-y-6 sm:space-y-8">

          {[
            {
              icon: "📋",
              title: "Information We Collect",
              content:
                "We may collect personal details such as your name, email address, phone number, delivery address, and payment information when you place an order or register on our platform.",
            },
            {
              icon: "🛒",
              title: "How We Use Your Information",
              list: [
                "To process and deliver your orders efficiently.",
                "To improve our products and user experience.",
                "To send updates, offers, and notifications.",
                "To provide customer support and assistance.",
              ],
            },
            {
              icon: "🔐",
              title: "Data Protection",
              content:
                "We implement strong security measures to protect your personal information from unauthorized access, misuse, or disclosure.",
            },
            {
              icon: "🍪",
              title: "Cookies & Tracking",
              content:
                "Farm2Home may use cookies and analytics tools to improve your browsing experience and understand user behavior.",
            },
            {
              icon: "🤝",
              title: "Third-Party Services",
              content:
                "We may share limited information with trusted payment gateways and delivery partners solely for completing transactions.",
            },
            {
              icon: "📧",
              title: "Marketing Communication",
              content:
                "You may receive promotional emails regarding offers and updates. You can unsubscribe anytime.",
            },
            {
              icon: "⚖️",
              title: "Your Rights",
              list: [
                "You can request access to your personal data.",
                "You can update or delete your account information.",
                "You may opt out of promotional communications anytime.",
              ],
            },
          ].map((item, i) => (

            <div
              key={i}
              className="group bg-white/80 backdrop-blur-xl border border-green-100 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >

              {/* HEADER */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">

                {/* ICON */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-100 flex items-center justify-center text-2xl sm:text-3xl shadow-sm flex-shrink-0">

                  {item.icon}

                </div>

                {/* TITLE */}
                <div>

                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">

                    {item.title}

                  </h3>

                </div>

              </div>

              {/* CONTENT */}
              <div className="mt-5 sm:mt-6 border-l-4 border-green-500 pl-4 sm:pl-6">

                {item.content && (

                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">

                    {item.content}

                  </p>

                )}

                {item.list && (

                  <ul className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base lg:text-lg">

                    {item.list.map((point, idx) => (

                      <li
                        key={idx}
                        className="flex items-start gap-3"
                      >

                        <span className="text-green-600 mt-1">
                          ●
                        </span>

                        <span>
                          {point}
                        </span>

                      </li>

                    ))}

                  </ul>

                )}

              </div>

            </div>

          ))}

        </div>

        {/* CONTACT SECTION */}
        <div className="mt-12 sm:mt-14 bg-gradient-to-br from-white to-[#f8fff8] rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 border border-green-100 shadow-lg">

          {/* TOP */}
          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium mb-5">

              📞 Contact Support

            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">

              Need Help?

            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">

              If you have questions regarding this Privacy Policy or your personal data, feel free to contact our support team anytime.

            </p>

          </div>

          {/* CONTACT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

            {[
              {
                icon: "📧",
                title: "Email Support",
                text: "support@farm2home.com",
              },
              {
                icon: "📞",
                title: "Phone Support",
                text: "+91 9876543210",
              },
              {
                icon: "📍",
                title: "Location",
                text: "Lucknow, India",
              },
            ].map((item, i) => (

              <div
                key={i}
                className="group bg-white rounded-3xl p-5 sm:p-6 border border-green-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center"
              >

                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-5 group-hover:scale-110 transition">

                  {item.icon}

                </div>

                <h3 className="font-bold text-lg sm:text-xl text-gray-800">

                  {item.title}

                </h3>

                <p className="text-gray-500 mt-3 text-sm sm:text-base break-words">

                  {item.text}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}