import { useEffect, useState } from "react";
import axiosSecure from "../../../api/axiosSecure"; // ✅ secure axios

import { toast } from "react-toastify";

const ApprovedOrder = () => {
  const [orders, setOrders] = useState([]);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [trackingForm, setTrackingForm] = useState({
    status: "",
    location: "",
    note: "",
    time: "",
  });

  // Fetch confirmed orders
  const fetchOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders"); // secure axios
      setOrders(res.data.filter((o) => o.orderStatus === "confirmed"));
    } catch (err) {
      console.error("Error fetching approved orders:", err);
      toast.error("Failed to fetch approved orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openTrackingModal = (order) => {
    setTrackingOrder(order);
    setTrackingForm({ status: "", location: "", note: "", time: "" });
  };

  const handleTrackingChange = (e) => {
    setTrackingForm({ ...trackingForm, [e.target.name]: e.target.value });
  };

  const submitTracking = async () => {
    if (!trackingOrder) return;
    try {
      await axiosSecure.patch(
        `/orders/tracking/${trackingOrder._id}`,
        trackingForm,
      );
      toast.success("Tracking updated!");
      setTrackingOrder(null);
      fetchOrders(); // refresh orders after update
    } catch (err) {
      console.error(err);
      toast.error("Failed to add tracking");
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Approved Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Approved Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o._id} className="text-center">
                  <td className="border p-2">{o._id.slice(0, 6)}...</td>
                  <td className="border p-2">{o.buyerName}</td>
                  <td className="border p-2">{o.productTitle}</td>
                  <td className="border p-2">{o.quantity}</td>
                  <td className="border p-2">
                    {new Date(o.approvedAt).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded"
                      onClick={() => openTrackingModal(o)}
                    >
                      Add Tracking
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
                  No approved orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-700 p-6 rounded w-96">
            <h3 className="font-bold mb-4">
              Add Tracking for {trackingOrder.productTitle}
            </h3>
            <select
              name="status"
              value={trackingForm.status}
              onChange={handleTrackingChange}
              className="border p-2 w-full mb-2"
            >
              <option value="">Select Status</option>
              <option value="Cutting Completed">Cutting Completed</option>
              <option value="Sewing Started">Sewing Started</option>
              <option value="Finishing">Finishing</option>
              <option value="QC Checked">QC Checked</option>
              <option value="Packed">Packed</option>
              <option value="Shipped / Out for Delivery">
                Shipped / Out for Delivery
              </option>
            </select>
            <input
              name="location"
              placeholder="Location"
              value={trackingForm.location}
              onChange={handleTrackingChange}
              className="border p-2 w-full mb-2"
            />
            <input
              name="note"
              placeholder="Note"
              value={trackingForm.note}
              onChange={handleTrackingChange}
              className="border p-2 w-full mb-2"
            />
            <input
              name="time"
              type="datetime-local"
              value={trackingForm.time}
              onChange={handleTrackingChange}
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setTrackingOrder(null)}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitTracking}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedOrder;
