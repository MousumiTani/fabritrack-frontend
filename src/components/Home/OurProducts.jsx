import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Card from "../../components/Shared/Card";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/products/home");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
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
        <h2 className="text-center mb-8">Our Products</h2>
        <p className="text-center text-gray-500">No products available.</p>
      </section>
    );

  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-center mb-8 text-3xl font-bold">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default OurProducts;
