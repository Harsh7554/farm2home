import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role:"user"//default
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
  const res = await API.post("/auth/register", form);

  // ✅ Save token
  localStorage.setItem("token", res.data.token);

  alert("Account created successfully ✅");

  // ✅ Direct login → go to home
  navigate("/");
} catch (err) {
    console.log(err);
        alert(err.response?.data?.error||err.response?.data?.message||"Error creating account")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-green-700">
          Create Account 🌱
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Join Farm2Home today
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg bg-white shadow-sm hover:border-green-500"
>
  <option value="user">Customer</option>
  <option value="farmer">Farmer</option>
</select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}