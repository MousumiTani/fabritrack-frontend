import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const updateUser = async (id, data) => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, data);

      // re-fetch users after update
      const res = await axios.get("http://localhost:5000/users");
      setUsers(Array.isArray(res.data) ? res.data : []);

      Swal.fire("Updated!", "User updated successfully", "success");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2 capitalize">{u.role}</td>
                <td className="border p-2 capitalize">{u.status}</td>

                <td className="border p-2 space-x-2">
                  {/* Role toggle */}
                  <button
                    onClick={() =>
                      updateUser(u._id, {
                        role: u.role === "admin" ? "user" : "admin",
                      })
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    {u.role === "admin" ? "Make User" : "Make Admin"}
                  </button>

                  {/* Suspend / Approve */}
                  <button
                    onClick={() =>
                      updateUser(u._id, {
                        status: u.status === "active" ? "suspended" : "active",
                      })
                    }
                    className={`px-3 py-1 text-white rounded ${
                      u.status === "active" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {u.status === "active" ? "Suspend" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
