import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);

      // ✅ save token
      localStorage.setItem("token", res.data.token);

      // ✅ save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      // 🔥 ROLE BASED REDIRECT
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "farmer") {
        navigate("/farmer");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-green-700">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mt-3">{error}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-600 cursor-pointer font-semibold hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}