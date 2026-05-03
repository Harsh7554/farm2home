import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white mt-20">

      {/* BACKGROUND BLURS */}
      <div className="absolute top-[-100px] left-[-80px] w-72 h-72 bg-white/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-80px] w-80 h-80 bg-lime-200/10 blur-3xl rounded-full"></div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">

          {/* LOGO & ABOUT */}
          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 bg-white/15 backdrop-blur-lg rounded-2xl flex items-center justify-center text-2xl shadow-lg">

                🌾

              </div>

              <h2 className="text-3xl font-black tracking-tight">

                Farm2Home

              </h2>

            </div>

            <p className="text-green-50 leading-relaxed text-sm sm:text-base">

              Bringing fresh, organic products directly from trusted farmers to your doorstep. Healthy living made simple, affordable, and sustainable.

            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-8">

              {["🌐", "📘", "📸", "💼"].map((icon, i) => (

                <div
                  key={i}
                  className="w-11 h-11 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center text-lg cursor-pointer hover:bg-white hover:text-green-600 hover:-translate-y-1 transition duration-300 shadow-lg"
                >

                  {icon}

                </div>

              ))}

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-xl font-bold mb-6">

              Quick Links

            </h3>

            <ul className="space-y-4 text-green-50">

              <li>
                <Link
                  to="/"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* CUSTOMER */}
          <div>

            <h3 className="text-xl font-bold mb-6">

              Customer

            </h3>

            <ul className="space-y-4 text-green-50">

              <li>
                <Link
                  to="/cart"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  Register
                </Link>
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-xl font-bold mb-6">

              Contact Us

            </h3>

            <div className="space-y-5 text-green-50">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">

                  📍

                </div>

                <div>

                  <p className="font-medium">

                    Lucknow, India

                  </p>

                  <p className="text-sm text-green-100">

                    Uttar Pradesh

                  </p>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">

                  📧

                </div>

                <div>

                  <p className="font-medium">

                    support@farm2home.com

                  </p>

                  <p className="text-sm text-green-100">

                    24/7 Support

                  </p>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">

                  📞

                </div>

                <div>

                  <p className="font-medium">

                    +91 9876543210

                  </p>

                  <p className="text-sm text-green-100">

                    Mon - Sat Support

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-green-100 text-sm">

          <p>

            © {new Date().getFullYear()} Farm2Home. All rights reserved.

          </p>

          <div className="flex items-center gap-6">

            <Link
              to="/privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}