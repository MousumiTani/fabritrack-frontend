import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosSecure from "../../api/axiosSecure"; // secure axios
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { imageUpload } from "../../utils";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [existingImages, setExistingImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  /* =============================
        LOAD EXISTING PRODUCT
  ============================= */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        const p = res.data;

        setValue("title", p.title);
        setValue("description", p.description);
        setValue("price", p.price);
        setValue("category", p.category);
        setValue("demoVideo", p.demoVideo);
        setValue("paymentOption", p.paymentOption || []);
        setValue("showOnHome", p.showOnHome);

        setExistingImages(p.images || []);
      } catch (err) {
        toast.error("Failed to load product");
        console.error(err);
      }
    };

    loadProduct();
  }, [id, setValue]);

  /* =============================
          SUBMIT UPDATE
  ============================= */
  const onSubmit = async (data) => {
    try {
      let images = existingImages;

      // If new images uploaded → replace
      if (data.images?.length > 0) {
        images = [];
        for (const file of data.images) {
          const url = await imageUpload(file);
          images.push(url);
        }
      }

      const updatedProduct = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        category: data.category,
        images,
        demoVideo: data.demoVideo || "",
        paymentOption: Array.isArray(data.paymentOption)
          ? data.paymentOption
          : [data.paymentOption],
        showOnHome: data.showOnHome || false,
      };

      await axiosSecure.patch(`/products/${id}`, updatedProduct);

      toast.success("Product updated successfully!");
      navigate("/dashboard/manage-products");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />

        <textarea
          {...register("description")}
          rows={4}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          {...register("price")}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />

        <select {...register("category")} className="w-full border p-2 rounded">
          <option value="Gents Item">Gents Item</option>
          <option value="Ladies Attire">Ladies Attire</option>
          <option value="Kids Specials">Kids Specials</option>
          <option value="Exclusive">Exclusive</option>
        </select>

        {/* Existing Images */}
        <div className="flex gap-2 flex-wrap">
          {existingImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="product"
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>

        {/* Upload New Images */}
        <input type="file" multiple {...register("images")} />

        <input
          {...register("demoVideo")}
          placeholder="Demo Video URL"
          className="w-full border p-2 rounded"
        />

        {/* Payment Options (MULTIPLE SELECT) */}
        <select
          multiple
          {...register("paymentOption")}
          className="w-full border p-2 rounded"
        >
          <option value="Cash On Delivery">Cash On Delivery</option>
          <option value="Pay First">Pay First</option>
        </select>

        {/* Show on Home */}
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("showOnHome")} />
          Show on Home
        </label>

        <button
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded"
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
