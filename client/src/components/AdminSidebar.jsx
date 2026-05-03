import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Categories", path: "/admin/categories", icon: Tag },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-green-600 to-green-800 text-white p-5 fixed top-0 left-0">
      <h1 className="text-2xl font-bold mb-8">Admin 👑</h1>

      <nav className="space-y-3">
        {menu.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-white text-green-700 font-semibold"
                    : "hover:bg-green-700"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}