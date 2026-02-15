import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure"; // ✅ import your secure axios
import Card from "../../components/Shared/Card";

const OurProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/products/home"); // ✅ secure request
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="max-w-6xl mx-auto my-12 ">
      <h2 className="text-center mb-8">Our Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default OurProducts;
