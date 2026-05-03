import { useState } from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar({ title = "Dashboard", onMenuClick }) {
  const [openProfile, setOpenProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="bg-white px-4 md:px-6 py-4 border-b flex justify-between items-center">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU BUTTON */}
        <Menu
          className="md:hidden cursor-pointer"
          onClick={onMenuClick}
        />

        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {title}
        </h2>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* Search (hide on small screens) */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={16} />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm"
          />
        </div>

        {/* Bell */}
        <Bell className="text-gray-600" />

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded-full text-sm">
              {user?.name?.charAt(0)}
            </div>
            <ChevronDown size={16} />
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-2 bg-white shadow rounded-lg w-36">
              <button onClick={()=>(window.location.href="/profile")} className="block w-full px-4 py-2 hover:bg-gray-100 text-left">
                Profile
              </button>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100 text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}