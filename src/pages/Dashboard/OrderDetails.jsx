import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosSecure from "../../api/axiosSecure";

const OrderDetails = () => {
  const { id } = useParams(); // order ID from URL
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p className="p-6">Loading order details...</p>;
  if (!order) return <p className="p-6 text-red-500">Order not found</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-700 rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="space-y-2">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Buyer Email:</strong> {order.userEmail}
        </p>
        <p>
          <strong>Status:</strong>
          <span
            className={`px-2 py-1 ml-2 rounded ${
              order.orderStatus === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : order.orderStatus === "confirmed"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
            }`}
          >
            {order.orderStatus}
          </span>
        </p>
        <p>
          <strong>Payment Status:</strong> {order.paymentStatus}
        </p>
        {order.shippingAddress && (
          <p>
            <strong>Shipping:</strong> {order.shippingAddress}
          </p>
        )}
        {order.totalAmount && (
          <p>
            <strong>Total Amount:</strong> ${order.totalAmount}
          </p>
        )}
        {order.createdAt && (
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        )}
      </div>

      {order.products && order.products.length > 0 && (
        <>
          <h3 className="mt-6 font-semibold">Products</h3>
          <table className="w-full border mt-2">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.quantity}</td>
                  <td className="p-2">${p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
