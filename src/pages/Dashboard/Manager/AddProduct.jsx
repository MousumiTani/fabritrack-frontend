import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../../components/Shared/Button";
import { imageUpload } from "../../../utils";
import axiosSecure from "../../../api/axiosSecure"; // ✅ use secure axios

const AddProduct = () => {
  const [previewImages, setPreviewImages] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      paymentOption: [],
      showOnHome: false,
    },
  });

  const watchImages = watch("images");

  useEffect(() => {
    if (watchImages?.length) {
      const previews = Array.from(watchImages).map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewImages(previews);
    } else {
      setPreviewImages([]);
    }
  }, [watchImages]);

  const onSubmit = async (data) => {
    try {
      // ✅ upload images first
      const uploadedImages = [];
      for (const file of data.images) {
        const url = await imageUpload(file);
        uploadedImages.push(url);
      }

      const productData = {
        title: data.title,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        availableQuantity: Number(data.availableQuantity),
        moq: Number(data.moq),
        images: uploadedImages,
        demoVideo: data.demoVideo || "",
        paymentOption: data.paymentOption || [],
        showOnHome: data.showOnHome || false,
      };

      // ✅ use axiosSecure, no need for manual token headers
      await axiosSecure.post("/products", productData);

      toast.success("Product created successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <section className="min-h-[80vh] p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Add Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: true })}
            placeholder="Product Name"
            className="input"
          />

          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            rows={4}
            className="input"
          />

          <select
            {...register("category", { required: true })}
            className="input"
          >
            <option value="">Select Category</option>
            <option value="Gents Item">Gents Item</option>
            <option value="Ladies Attire">Ladies Attire</option>
            <option value="Kids Specials">Kids Specials</option>
            <option value="Exclusive">Exclusive</option>
          </select>

          <input
            type="number"
            {...register("price", { required: true, min: 0 })}
            placeholder="Price"
            className="input"
          />

          <input
            type="number"
            {...register("availableQuantity", { required: true, min: 0 })}
            placeholder="Available Quantity"
            className="input"
          />

          <input
            type="number"
            {...register("moq", { required: true, min: 20 })}
            placeholder="MOQ"
            className="input"
          />

          {/* Payment Options - Multiple Selection */}
          <div>
            <label className="block font-medium mb-2">Payment Options</label>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Cash On Delivery"
                  {...register("paymentOption")}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Pay First"
                  {...register("paymentOption")}
                />
                PayFirst
              </label>
            </div>
          </div>

          <input
            type="url"
            {...register("demoVideo")}
            placeholder="Demo Video (optional)"
            className="input"
          />

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("showOnHome")} />
            <label className="text-sm">Show on Home Page</label>
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            {...register("images", { required: true })}
          />

          {previewImages.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {previewImages.map((img, i) => (
                <img key={i} src={img} className="w-24 h-24 rounded" />
              ))}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
