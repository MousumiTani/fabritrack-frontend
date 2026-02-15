import { useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";

import Card from "../components/Shared/Card";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
