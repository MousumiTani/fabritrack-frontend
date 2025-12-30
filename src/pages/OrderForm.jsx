import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const OrderForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch product
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Autofill email
  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const { title, price, availableQuantity, moq, paymentOption } = product;

  const quantity = watch("quantity") || 0;
  const totalPrice = Math.round(quantity * price);

  const onSubmit = async (data) => {
    const orderData = {
      userEmail: user.email,
      productId: product._id,
      productTitle: title,
      unitPrice: price,
      quantity: data.quantity,
      totalPrice,
      paymentMethod: data.paymentOption,
      paymentStatus:
        data.paymentOption === "Cash on Delivery" ? "unpaid" : "pending",
      address: data.address,
      contact: data.contact,
      notes: data.notes,
    };

    // 1️⃣ Save order first
    const res = await axios.post("http://localhost:5000/orders", orderData);

    // 2️⃣ Payment decision
    if (data.paymentOption === "Cash on Delivery") {
      navigate("/dashboard/my-orders");
    } else {
      navigate(`/payment/${res.data.insertedId}`);
    }
  };

  return (
    <section className="max-w-3xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Order Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <input
          {...register("email")}
          readOnly
          className="w-full px-4 py-2 border rounded bg-gray-100"
        />

        {/* Product Title */}
        <input
          value={title}
          readOnly
          className="w-full px-4 py-2 border rounded bg-gray-100"
        />

        {/* Unit Price */}
        <input
          value={`৳ ${price}`}
          readOnly
          className="w-full px-4 py-2 border rounded bg-gray-100"
        />

        {/* Quantity */}
        <input
          type="number"
          {...register("quantity", {
            required: "Quantity is required",
            min: {
              value: moq,
              message: `Minimum order quantity is ${moq}`,
            },
            max: {
              value: availableQuantity,
              message: `Only ${availableQuantity} items available`,
            },
            valueAsNumber: true,
          })}
          placeholder={`Quantity (min ${moq})`}
          className="w-full px-4 py-2 border rounded"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}

        {/* Total Price */}
        <input
          value={`৳ ${totalPrice || 0}`}
          readOnly
          className="w-full px-4 py-2 border rounded bg-gray-100 font-semibold"
        />

        {/* First Name */}
        <input
          {...register("firstName", { required: "First name required" })}
          placeholder="First Name"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Last Name */}
        <input
          {...register("lastName", { required: "Last name required" })}
          placeholder="Last Name"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Contact */}
        <input
          {...register("contact", { required: "Contact number required" })}
          placeholder="Contact Number"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Address */}
        <textarea
          {...register("address", { required: "Address required" })}
          placeholder="Delivery Address"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Payment Option */}
        <select
          {...register("paymentOption", {
            required: "Payment option required",
          })}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Payment</option>
          {Array.isArray(paymentOption) ? (
            paymentOption.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))
          ) : (
            <option value={paymentOption}>{paymentOption}</option>
          )}
        </select>

        {/* Notes */}
        <textarea
          {...register("notes")}
          placeholder="Additional notes (optional)"
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded hover:bg-gray-800"
        >
          Confirm Order
        </button>
      </form>
    </section>
  );
};

export default OrderForm;
