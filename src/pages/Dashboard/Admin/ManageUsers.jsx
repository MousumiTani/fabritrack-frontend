import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../../api/axiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserStatus = async (id, action) => {
    try {
      let data = {};
      if (action === "approve") {
        data = { status: "active" }; // Approve → active
      } else if (action === "suspend") {
        const { value: reason } = await Swal.fire({
          title: "Suspend User",
          input: "textarea",
          inputLabel: "Reason for suspension",
          inputPlaceholder: "Type your reason here...",
          showCancelButton: true,
        });
        if (!reason) return; // Cancelled or empty
        data = { status: "suspended", suspendReason: reason };
      }

      await axiosSecure.patch(`/users/status/${id}`, data);
      fetchUsers(); // refresh table
      Swal.fire(
        "Success",
        `User ${action === "approve" ? "approved" : "suspended"} successfully`,
        "success",
      );
    } catch (err) {
      console.error("Error updating user status:", err);
      Swal.fire("Error", "Failed to update user", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
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
                  <button
                    onClick={() => updateUserStatus(u._id, "approve")}
                    className={`px-3 py-1 rounded ${
                      u.status === "active" ? "bg-gray-400" : "bg-green-500"
                    } text-white`}
                    disabled={u.status === "active"} // disabled once active
                  >
                    {u.status === "active" ? "Approved" : "Approve"}
                  </button>

                  <button
                    onClick={() => updateUserStatus(u._id, "suspend")}
                    className={`px-3 py-1 rounded ${
                      u.status === "suspended" ? "bg-gray-400" : "bg-red-500"
                    } text-white`}
                    disabled={u.status === "suspended"} // disabled once suspended
                  >
                    {u.status === "suspended" ? "Suspended" : "Suspend"}
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
