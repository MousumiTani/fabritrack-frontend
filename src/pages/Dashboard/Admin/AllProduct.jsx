import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle Show on Home
  const handleToggleHome = async (id, currentValue) => {
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        showOnHome: !currentValue,
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        fetchProducts();
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Products (Admin)</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Created By</th>
              <th className="p-2 border">Show on Home</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-14 h-14 object-cover mx-auto rounded"
                  />
                </td>

                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">৳ {p.price}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">{p.createdBy?.slice(0, 8)}...</td>

                {/* Show on Home Toggle */}
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={p.showOnHome}
                    onChange={() => handleToggleHome(p._id, p.showOnHome)}
                  />
                </td>

                {/* Actions */}
                <td className="p-2 border space-x-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() =>
                      navigate(`/dashboard/update-product/${p._id}`)
                    }
                  >
                    Update
                  </button>

                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProduct;
