import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, ShoppingCart } from "lucide-react"; // install if not

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ FETCH CART COUNT
  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!Array.isArray(data)) return;

        const total = data.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );

        setCartCount(total);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) getCart();
  }, [token]);

  // ✅ LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

 return (
  <nav className="bg-gradient-to-r from-green-600 to-green-500 shadow-md sticky top-0 z-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

      {/* 🔥 LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-white text-xl sm:text-2xl font-bold cursor-pointer tracking-wide"
      >
        🌿 Farm2Home
      </h1>

      {/* 🔥 DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6 text-white font-medium">

        <Link to="/" className="hover:text-green-200 transition">
          Home
        </Link>

        <Link to="/products" className="hover:text-green-200 transition">
          Products
        </Link>

        <Link to="/about" className="hover:text-green-200 transition">
          About
        </Link>

        <Link to="/contact" className="hover:text-green-200 transition">
          Contact
        </Link>

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold"
          >
            Admin
          </Link>
        )}
      </div>

      {/* 🔥 RIGHT SIDE */}
      <div className="flex items-center gap-3">
         
        {/* CART */}
        <Link to="/cart" className="relative text-white text-xl">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* LOGIN / LOGOUT */}
        {!user ? (
          <Link
            to="/login"
            className="hidden sm:block bg-white text-green-600 px-4 py-1.5 rounded-md font-semibold hover:bg-gray-100"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={logout}
            className="hidden sm:block bg-red-500 px-4 py-1.5 rounded-md text-white hover:bg-red-600"
          >
            Logout
          </button>
        )}

        {/* MOBILE MENU ICON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>
    </div>

    {/* 🔥 MOBILE MENU */}
    {menuOpen && (
      <div className="md:hidden bg-green-600 px-4 pb-4 flex flex-col gap-3 text-white">

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

        {user?.role === "admin" && (
          <Link to="/admin" onClick={() => setMenuOpen(false)}>
            Admin
          </Link>
        )}

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    )}
  </nav>
);
}