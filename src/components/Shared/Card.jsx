import { Link } from "react-router";
import Button from "../Button";

const Card = ({ product }) => {
  const {
    _id,
    title,
    category,
    description,
    price,
    availableQuantity,
    images,
  } = product;

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4">
      <img
        src={images?.[0]}
        alt={name}
        className="h-64 w-full object-cover rounded"
      />

      <h3 className="text-lg font-semibold mt-3">{title}</h3>
      <p className="text-sm text-gray-500">{category}</p>
      {description && (
        <p className="text-sm mt-2 text-gray-600">
          {description.slice(0, 80)}...
        </p>
      )}

      <p className="font-bold text-lg mt-2">$ {price}</p>

      {availableQuantity !== undefined && (
        <p className="text-sm mb-2">Available: {availableQuantity}</p>
      )}

      <Link to={`/product/${_id}`}>
        <Button variant="primary" size="full">
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default Card;
