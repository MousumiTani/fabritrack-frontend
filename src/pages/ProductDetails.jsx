import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import useAuth from "../hooks/useAuth";
import Button from "../components/Shared/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // logged-in user

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/products/${id}`)

      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product)
    return <p className="text-center mt-10">Loading Product Details...</p>;

  const {
    title,
    description,
    category,
    price,
    availableQuantity,
    moq,
    paymentOption,
    images,
  } = product;

  // Read role from localStorage
  const role = localStorage.getItem("user-role"); // admin | manager | buyer
  const canOrder = user && role === "buyer"; // only buyers can order

  const paymentOptionsDisplay = Array.isArray(paymentOption)
    ? paymentOption.join(", ")
    : paymentOption;

  return (
    <section className="max-w-6xl mx-auto my-12 px-4 grid md:grid-cols-2 gap-10">
      <div>
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-96 object-cover rounded"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-400 mt-1">{category}</p>
        <p className="mt-4 text-gray-400">{description}</p>

        <p className="mt-4 font-bold text-xl">$ {price}</p>
        <p className="mt-2">Available: {availableQuantity}</p>
        <p className="mt-1">Minimum Order: {moq}</p>
        <p className="my-2">Payment Options: {paymentOptionsDisplay}</p>

        {canOrder ? (
          <Button
            variant="primary"
            size="full"
            onClick={() => navigate(`/order/${id}`)}
          >
            Order Now
          </Button>
        ) : (
          <p className="text-sm text-red-500 mt-2">
            Only buyers can place orders
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
