import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch approved orders
  const fetchApprovedOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      // Only approved orders
      const approvedOrders = res.data.filter(
        (o) => o.orderStatus === "approved"
      );
      setOrders(approvedOrders);
    } catch (err) {
      console.error("Error fetching approved orders:", err);
      Swal.fire("Error", "Failed to fetch approved orders", "error");
    }
  };

  useEffect(() => {
    fetchApprovedOrders();
  }, []);

  // Add tracking info
  const addTracking = async (orderId) => {
    const { value: tracking } = await Swal.fire({
      title: "Add Tracking Info",
      html:
        `<input id="location" class="swal2-input" placeholder="Location">` +
        `<input id="status" class="swal2-input" placeholder="Status">` +
        `<textarea id="note" class="swal2-textarea" placeholder="Note"></textarea>`,
      focusConfirm: false,
      preConfirm: () => ({
        location: document.getElementById("location").value,
        status: document.getElementById("status").value,
        note: document.getElementById("note").value,
        timestamp: new Date(),
      }),
    });

    if (!tracking) return;

    try {
      // You need a 'tracking' array in your order document
      await axios.patch(`http://localhost:5000/orders/${orderId}`, {
        $push: { tracking: tracking },
      });
      Swal.fire("Added!", "Tracking info added successfully", "success");
      fetchApprovedOrders();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add tracking info", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Approved Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100 text-center">
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
                  <td className="border p-2">{o.userEmail}</td>
                  <td className="border p-2">{o.productTitle}</td>
                  <td className="border p-2">{o.quantity}</td>
                  <td className="border p-2">
                    {new Date(o.approvedAt || o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => addTracking(o._id)}
                      className="px-3 py-1 bg-purple-500 text-white rounded"
                    >
                      Add Tracking
                    </button>
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "Tracking Timeline",
                          html:
                            o.tracking
                              ?.map(
                                (t, i) =>
                                  `<p><strong>${t.status}</strong> at ${
                                    t.location
                                  } on ${new Date(
                                    t.timestamp
                                  ).toLocaleString()}<br/>${t.note || ""}</p>`
                              )
                              .join("<hr/>") || "No tracking info",
                          width: 600,
                        })
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      View Tracking
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500 text-center">
                  No approved orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedOrders;
