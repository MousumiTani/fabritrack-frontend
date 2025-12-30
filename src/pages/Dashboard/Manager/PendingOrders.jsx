import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchPendingOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders/pending");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching pending orders:", err);
      Swal.fire("Error", "Failed to fetch pending orders", "error");
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const approveOrder = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/orders/approve/${id}`);
      Swal.fire("Approved!", "Order has been approved.", "success");
      fetchPendingOrders();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to approve order", "error");
    }
  };

  const rejectOrder = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.patch(`http://localhost:5000/orders/reject/${id}`);
      Swal.fire("Rejected!", "Order has been rejected.", "success");
      fetchPendingOrders();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to reject order", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100 text-center">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Order Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o._id} className="text-center">
                  <td className="border p-2">{o._id.slice(0, 6)}...</td>
                  <td className="border p-2">{o.userEmail}</td>
                  <td className="border p-2">{o.productTitle}</td>
                  <td className="border p-2">{o.quantity}</td>
                  <td className="border p-2">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => navigate(`/dashboard/order/${o._id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => approveOrder(o._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectOrder(o._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500 text-center">
                  No pending orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
