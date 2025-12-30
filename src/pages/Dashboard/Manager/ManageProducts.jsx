import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Delete product
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setProducts(products.filter((p) => p._id !== id));
            Swal.fire("Deleted!", "Product has been deleted.", "success");
          });
      }
    });
  };

  // Search filter
  const filteredProducts = products.filter((product) => {
    const title = product?.title?.toLowerCase() || "";
    const category = product?.category?.toLowerCase() || "";
    const query = search.toLowerCase();

    return title.includes(query) || category.includes(query);
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or category"
        className="input input-bordered w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.images?.[0]}
                    alt=""
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.paymentMode}</td>
                <td className="space-x-2">
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
