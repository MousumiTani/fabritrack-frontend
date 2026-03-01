import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Shared/Card";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const API = import.meta.env.VITE_API_URL;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products/all`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (products.length === 0)
    return (
      <section className="max-w-6xl mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
        <p className="text-center text-gray-500">No products available.</p>
      </section>
    );

  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
