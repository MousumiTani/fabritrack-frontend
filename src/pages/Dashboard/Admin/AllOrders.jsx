import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/orders");
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // Filter + Search
  const filteredOrders = orders.filter((o) => {
    const statusMatch =
      statusFilter === "all" ? true : o.orderStatus === statusFilter;

    const searchMatch =
      o.productTitle?.toLowerCase().includes(search.toLowerCase()) ||
      o.userEmail?.toLowerCase().includes(search.toLowerCase());

    return statusMatch && searchMatch;
  });

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/orders/${id}`, {
        orderStatus: status,
      });
      // Refetch orders after update
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <input
          type="text"
          placeholder="Search by user or product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o._id} className="text-center">
                <td className="border p-2">{o._id.slice(0, 6)}...</td>
                <td className="border p-2">{o.userEmail}</td>
                <td className="border p-2">{o.productTitle}</td>
                <td className="border p-2">{o.quantity}</td>
                <td className="border p-2">৳ {o.totalPrice}</td>
                <td className="border p-2 capitalize">{o.orderStatus}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => navigate(`/dashboard/order/${o._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </button>

                  {o.orderStatus === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(o._id, "approved")}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(o._id, "rejected")}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-gray-500 text-center">
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

export default AllOrders;
