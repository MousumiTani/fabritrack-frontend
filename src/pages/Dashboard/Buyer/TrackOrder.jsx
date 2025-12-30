import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/orders/track/${orderId}`
        );
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [orderId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6">Order not found</p>;

  const tracking = order.tracking || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Track Order</h2>
      <p className="text-gray-600 mb-6">Product: {order.productTitle}</p>

      {/* Timeline */}
      <div className="relative border-l-2 border-gray-300 pl-6">
        {tracking.length === 0 && (
          <p className="text-gray-500">No tracking updates yet.</p>
        )}

        {tracking.map((step, index) => {
          const isLast = index === tracking.length - 1;

          return (
            <div key={index} className="mb-8 relative">
              {/* Dot */}
              <span
                className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full ${
                  isLast ? "bg-green-600" : "bg-gray-400"
                }`}
              />

              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">{step.status}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(step.time).toLocaleString()}
                </p>
                <p className="text-sm mt-1">📍 {step.location}</p>
                {step.note && (
                  <p className="text-sm mt-2 text-gray-700">📝 {step.note}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Map Placeholder */}
      <div className="mt-8 text-gray-400 text-sm">
        🗺 Map integration can be added later (Google Maps / Leaflet)
      </div>
    </div>
  );
};

export default TrackOrder;
