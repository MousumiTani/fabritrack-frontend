import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axiosSecure from "../../../api/axiosSecure"; // ✅ secure axios

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch manager products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // ✅ use backend route GET /products
      const res = await axiosSecure.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      Swal.fire("Error", "Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (p) => {
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
        await axiosSecure.delete(`/products/${p._id}`); // ✅ secure delete
        fetchProducts();
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  // Filter products by name or category
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      <input
        type="text"
        placeholder="Search by name or category"
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Payment Mode</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-14 h-14 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">$ {p.price}</td>
                <td className="p-2 border">
                  {Array.isArray(p.paymentOption)
                    ? p.paymentOption.join(", ")
                    : p.paymentOption || "-"}
                </td>

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
                    onClick={() => handleDelete(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
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

export default ManageProducts;
