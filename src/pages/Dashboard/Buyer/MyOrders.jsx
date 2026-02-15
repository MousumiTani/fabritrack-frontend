import { useEffect, useState } from "react";
import axiosSecure from "../../../api/axiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // View modal state
  const [viewOrder, setViewOrder] = useState(null);

  // Cancel confirmation modal state
  const [cancelOrderId, setCancelOrderId] = useState(null);

  // Fetch orders from backend
  // ✅ Fetch orders
  const fetchOrders = async () => {
    if (!user?.email) return;

    try {
      const res = await axiosSecure.get(`/orders/buyer/${user.email}`);

      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  // ✅ Cancel order
  const confirmCancelOrder = async () => {
    if (!cancelOrderId) return;

    try {
      await axiosSecure.patch(`/orders/cancel/${cancelOrderId}`);

      // remove from UI after success
      setOrders((prev) => prev.filter((o) => o._id !== cancelOrderId));

      setCancelOrderId(null);
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };
  // Filter orders by search
  const filteredOrders = orders.filter((o) =>
    o.productTitle?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">My Orders</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-64 mb-4"
      />

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => {
              const isPending = o.orderStatus.toLowerCase() === "pending";

              return (
                <tr key={o._id} className="text-center">
                  <td className="border p-2">
                    {o._id.toString().slice(0, 6)}...
                  </td>
                  <td className="border p-2">{o.productTitle}</td>
                  <td className="border p-2">{o.quantity}</td>
                  <td className="border p-2 capitalize">{o.orderStatus}</td>
                  <td className="border p-2">{o.paymentMethod}</td>
                  <td className="border p-2 space-x-2">
                    {/* View button opens modal */}
                    <button
                      onClick={() => setViewOrder(o)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>

                    {/* Cancel button only if pending */}
                    <button
                      onClick={() => setCancelOrderId(o._id)}
                      disabled={!isPending}
                      className={`px-3 py-1 rounded text-white ${
                        isPending
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <p>
              <strong>Order ID:</strong> {viewOrder._id}
            </p>
            <p>
              <strong>Product:</strong> {viewOrder.productTitle}
            </p>
            <p>
              <strong>Quantity:</strong> {viewOrder.quantity}
            </p>
            <p>
              <strong>Status:</strong> {viewOrder.orderStatus}
            </p>
            <p>
              <strong>Payment:</strong> {viewOrder.paymentMethod}
            </p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Tracking Timeline:</h4>
              {viewOrder.tracking?.length > 0 ? (
                <ul className="border-l-2 border-gray-300 pl-4">
                  {viewOrder.tracking.map((t, i) => (
                    <li key={i} className="mb-2">
                      <p className="text-gray-700">{t.status}</p>
                      <p className="text-gray-500 text-sm">{t.time}</p>
                      {t.note && (
                        <p className="text-gray-400 text-sm">{t.note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No tracking info.</p>
              )}
            </div>

            <button
              onClick={() => setViewOrder(null)}
              className="absolute top-2 right-2 text-gray-500 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Cancel</h3>
            <p className="mb-6">Are you sure you want to cancel this order?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmCancelOrder}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setCancelOrderId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
