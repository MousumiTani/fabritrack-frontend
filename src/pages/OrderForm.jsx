import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const OrderForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  /* =======================
       FETCH PRODUCT
  ======================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product:", err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to load product. Please try again later.",
          timer: 2500,
          showConfirmButton: false,
        });
      }
    };

    if (id) fetchProduct();
  }, [id]);

  /* =======================
      AUTOFILL USER INFO
  ======================= */
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.displayName) setValue("name", user.displayName);
  }, [user, setValue]);

  if (!product) {
    return <p className="text-center mt-16">Loading product...</p>;
  }

  const { title, price, availableQuantity, moq, paymentOption } = product;
  const quantity = watch("quantity") || 0;
  const totalPrice = quantity * price;

  /* =======================
        SUBMIT ORDER
  ======================= */
  const onSubmit = async (data) => {
    if (!data.paymentOption) return;

    setSubmitting(true);

    try {
      const orderData = {
        buyerName: data.name,
        userEmail: user.email,
        productId: product._id,
        productTitle: title,
        unitPrice: price,
        quantity: data.quantity,
        totalPrice,
        paymentMethod: data.paymentOption, // Cash On Delivery or Pay First
        paymentStatus:
          data.paymentOption === "Cash On Delivery" ? "unpaid" : "pending",
        contact: data.contact,
        address: data.address,
        notes: data.notes,
      };

      const res = await axiosSecure.post("/orders", orderData);

      // Decide what to do based on selected payment option
      if (data.paymentOption === "Cash On Delivery") {
        setShowModal(true); // show success modal
      } else {
        navigate(`/payment/${res.data.insertedId}`); // redirect to Stripe
      }
    } catch (err) {
      console.error("Order submission failed:", err);
      Swal.fire({
        icon: "error",
        title: "Order failed",
        text: "Please login and try again.",
        timer: 2500,
        showConfirmButton: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto my-6 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-center mb-6">Place Your Order</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              readOnly
              className="input-field"
            />
          </div>

          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className="input-field"
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          {/* Product */}
          <div>
            <label className="label">Product</label>
            <input value={title} readOnly className="input-field" />
          </div>

          {/* Unit Price */}
          <div>
            <label className="label">Unit Price</label>
            <input value={`$ ${price}`} readOnly className="input-field" />
          </div>

          {/* Quantity */}
          <div>
            <label className="label">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity required",
                min: { value: moq, message: `Minimum ${moq}` },
                max: {
                  value: availableQuantity,
                  message: `Only ${availableQuantity} available`,
                },
                valueAsNumber: true,
              })}
              placeholder={`Min ${moq}`}
              className="input-field"
            />
            {errors.quantity && (
              <p className="error-text">{errors.quantity.message}</p>
            )}
          </div>

          {/* Total */}
          <div>
            <label className="label">Total Price</label>
            <input
              value={`$ ${totalPrice || 0}`}
              readOnly
              className="input-field font-semibold"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="label">Contact Number</label>
            <input
              {...register("contact", { required: "Contact required" })}
              className="input-field"
            />
            {errors.contact && (
              <p className="error-text">{errors.contact.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="label">Delivery Address</label>
            <textarea
              {...register("address", { required: "Address required" })}
              className="input-field h-20"
            />
            {errors.address && (
              <p className="error-text">{errors.address.message}</p>
            )}
          </div>

          {/* Payment */}
          <div>
            <label className="label">Payment Method</label>
            <select
              {...register("paymentOption", {
                required: "Select payment method",
              })}
              className="input-field"
            >
              <option value="">Select Payment</option>
              {Array.isArray(paymentOption) &&
                paymentOption.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
            </select>
            {errors.paymentOption && (
              <p className="error-text">{errors.paymentOption.message}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="label">Notes</label>
            <textarea {...register("notes")} className="input-field h-20" />
            {errors.notes && (
              <p className="error-text">{errors.notes.message}</p>
            )}
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#5f4631] text-white rounded-xl hover:bg-[#4c3829] transition disabled:opacity-60"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm text-center space-y-4">
            <h3 className="text-xl font-semibold text-green-600">
              🎉 Order Placed!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your order has been placed successfully.
              <br />
              It will be reviewed shortly.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard/my-orders");
              }}
              className="w-full py-2 bg-[#5f4631] text-white rounded-lg hover:bg-[#4c3829]"
            >
              Go to My Orders
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderForm;
