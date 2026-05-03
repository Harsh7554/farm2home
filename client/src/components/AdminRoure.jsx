import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in OR not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}