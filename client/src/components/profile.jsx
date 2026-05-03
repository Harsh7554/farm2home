import { useState } from "react";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    role: storedUser?.role || "",
    image: storedUser?.image || "https://i.pravatar.cc/150",
  });

  // ✅ Image preview only (no file state → no warning)
  const handleImage = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const preview = URL.createObjectURL(selected);
    setUser({ ...user, image: preview });
  };

  // ✅ Save profile
 
  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error");
    }

    localStorage.setItem("user", JSON.stringify(data));

    alert("Profile updated successfully ✅");
  } catch (err) {
    console.log(err);
    alert("Error updating profile ❌");
  }
};
  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.image}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <label className="mt-2 text-sm text-green-600 cursor-pointer">
          Change Photo
          <input
            type="file"
            hidden
            onChange={handleImage}
          />
        </label>
      </div>

      {/* Form */}
      <div className="space-y-4">

        <input
          name="name"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          placeholder="Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
          name="email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
          value={user.role}
          disabled
          className="w-full p-3 border rounded-lg bg-gray-100"
        />

        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Save Changes 💾
        </button>

      </div>
    </div>
  );
}