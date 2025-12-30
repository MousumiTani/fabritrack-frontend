import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth(); // role: admin | manager | customer

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  // Safely map DB fields
  const {
    title, // your DB uses title, not name
    description,
    category,
    price,
    availableQuantity,
    moq,
    paymentOption,
    images,
  } = product;

  // Only customers can order
  const canOrder = user && role !== "admin" && role !== "manager";

  // Safely handle paymentOption (string or array)
  const paymentOptionsDisplay = Array.isArray(paymentOption)
    ? paymentOption.join(", ")
    : paymentOption;

  return (
    <section className="max-w-6xl mx-auto my-12 px-4 grid md:grid-cols-2 gap-10">
      {/* Product Images */}
      <div>
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-96 object-cover rounded"
        />
      </div>

      {/* Product Info */}
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-gray-500 mt-1">{category}</p>

        <p className="mt-4 text-gray-700">{description}</p>

        <p className="mt-4 font-bold text-xl">৳ {price}</p>
        <p className="mt-2">Available: {availableQuantity}</p>
        <p className="mt-1">Minimum Order: {moq}</p>

        <p className="mt-2">Payment Options: {paymentOptionsDisplay}</p>

        {/* Order / Book Now Button */}
        <button
          disabled={!canOrder}
          onClick={() => navigate(`/order/${id}`)}
          className={`mt-6 w-full py-3 rounded text-white ${
            canOrder
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Order Now
        </button>

        {!canOrder && (
          <p className="text-sm text-red-500 mt-2">
            Admins & Managers cannot place orders
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
