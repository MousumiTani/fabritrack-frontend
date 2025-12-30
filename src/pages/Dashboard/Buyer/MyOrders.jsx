import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const { user } = useAuth(); // logged-in user
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get("http://localhost:5000/orders");
      const userOrders = res.data.filter((o) => o.userEmail === user.email);
      setOrders(Array.isArray(userOrders) ? userOrders : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (!user?.email) return; // don't run if user is not loaded yet

    const getOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/orders");
        const userOrders = res.data.filter((o) => o.userEmail === user.email);
        setOrders(Array.isArray(userOrders) ? userOrders : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    getOrders();
  }, [user]);

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.patch(`http://localhost:5000/orders/${id}`, {
        orderStatus: "rejected",
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((o) =>
    o.productTitle?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
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
            {filteredOrders.map((o) => (
              <tr key={o._id} className="text-center">
                <td className="border p-2">{o._id.slice(0, 6)}...</td>
                <td className="border p-2">{o.productTitle}</td>
                <td className="border p-2">{o.quantity}</td>
                <td className="border p-2 capitalize">{o.orderStatus}</td>
                <td className="border p-2">{o.paymentMethod}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => navigate(`/dashboard/order/${o._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </button>
                  {o.orderStatus === "pending" && (
                    <button
                      onClick={() => cancelOrder(o._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
