import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosSecure from "../api/axiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;

const CheckoutForm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch client secret on mount
  useEffect(() => {
    if (!orderId) return;

    axiosSecure
      .post("/payment/create-payment-intent", { orderId })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => {
        console.error(
          "CREATE PAYMENT INTENT ERROR:",
          err.response?.data || err.message,
        );
        setMessage("Failed to initialize payment");
      });
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setMessage("");

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      },
    );

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.patch(`/payment/orders/payment-success/${orderId}`);
        navigate("/dashboard/my-orders");
      } catch (err) {
        console.error(
          "Payment success update failed:",
          err.response?.data || err.message,
        );
        setMessage("Payment succeeded, but order update failed.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-center mb-4">Card Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 border rounded-md bg-gray-50">
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}
          <button
            type="submit"
            disabled={!stripe || !clientSecret || loading}
            className="w-full py-3 bg-black text-white rounded-md disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};
