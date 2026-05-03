import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update role
  const updateRole = async (id, role) => {
    try {
      setUpdatingId(id);
      await API.put(`/auth/users/${id}`, { role });

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/auth/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="p-6 text-gray-600 text-lg">Loading users...</div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Users
        </h1>
      </div>

      {/* Empty State */}
      {users.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Change Role</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-gray-600">{u.email}</td>

                  {/* Role Badge */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : u.role === "farmer"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* Role Change */}
                  <td className="p-3">
                    <select
                      value={u.role}
                      disabled={updatingId === u._id}
                      onChange={(e) =>
                        updateRole(u._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded focus:outline-none"
                    >
                      <option value="user">User</option>
                      <option value="farmer">Farmer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  {/* Delete */}
                  <td className="p-3">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}