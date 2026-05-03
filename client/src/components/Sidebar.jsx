import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Package } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-700 shadow"
      : "text-green-100";

  return (
    <div className="w-64 h-screen fixed bg-gradient-to-b from-green-600 to-green-800 text-white p-5">

      {/* Logo */}
      <h2 className="text-2xl font-bold mb-10">
        🌾 Farm2Home
      </h2>

      {/* Menu */}
      <nav className="flex flex-col gap-3">

        <Link
          to="/farmer"
          className={`flex items-center gap-3 p-3 rounded-lg transition hover:bg-green-700 ${isActive("/farmer")}`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/farmer/add-product"
          className={`flex items-center gap-3 p-3 rounded-lg transition hover:bg-green-700 ${isActive("/farmer/add-product")}`}
        >
          <PlusCircle size={18} />
          Add Product
        </Link>

        <Link
          to="/farmer/my-products"
          className={`flex items-center gap-3 p-3 rounded-lg transition hover:bg-green-700 ${isActive("/farmer/my-products")}`}
        >
          <Package size={18} />
          My Products
        </Link>

      </nav>

      {/* Bottom Section (Optional) */}
      <div className="absolute bottom-6 left-5 text-sm text-green-200">
        <p>© Farm2Home</p>
      </div>

    </div>
  );
}