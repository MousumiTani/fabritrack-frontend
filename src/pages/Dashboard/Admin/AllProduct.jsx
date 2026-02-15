import { useEffect, useState } from "react";
import axiosSecure from "../../../api/axiosSecure";
import Swal from "sweetalert2";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };




  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/products/${id}`);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        fetchProducts();
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire(
          "Error",
          err.response?.data?.message || "Failed to delete product",
          "error",
        );
      }
    }
  };

  const toggleShowOnHome = async (id, current) => {
    try {
      await axiosSecure.patch(`/products/show-home/${id}`, {
        showOnHome: !current,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error updating showOnHome:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="text-center">
              <th className="border p-2">Image</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Created By</th>
              <th className="border p-2">Show on Home</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border p-2">
                  {p.images ? (
                    <img
                      src={p.images}
                      alt={p.title}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{p.title}</td>
                <td className="border p-2">${p.price}</td>
                <td className="border p-2 capitalize">{p.category}</td>
                <td className="border p-2">{p.createdBy}</td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={p.showOnHome || false}
                    onChange={() => toggleShowOnHome(p._id, p.showOnHome)}
                  />
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
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
