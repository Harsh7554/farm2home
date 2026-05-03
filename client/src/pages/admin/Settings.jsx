import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminSettings() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Settings saved ✅");
  };

  return (
    <div className="p-6 md:ml-64 min-h-screen bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">Settings ⚙️</h1>

      <form
        onSubmit={handleSave}
        className="bg-white p-6 rounded-xl shadow space-y-6 max-w-xl"
      >

        {/* 👤 Profile */}
        <div>
          <h2 className="font-semibold mb-2">Profile</h2>

          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            className="border p-2 rounded w-full mb-2"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
        </div>

        {/* 🔐 Password */}
        <div>
          <h2 className="font-semibold mb-2">Change Password</h2>

          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
        </div>

        {/* ⚙️ Toggles */}
        <div>
          <h2 className="font-semibold mb-2">Preferences</h2>

          <div className="flex justify-between items-center mb-2">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Settings
        </button>

      </form>
    </div>
  );
}