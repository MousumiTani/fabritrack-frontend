import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import AuthContext from "../../../context/AuthContext";
import { imageUpload } from "../../../utils";

const AddProduct = () => {
  const { user } = useContext(AuthContext);

  // Only Managers can access
  // if (user?.role !== "manager") {
  //  return <p className="text-center text-red-500 mt-10">Access Denied</p>;
  //}

  const [previewImages, setPreviewImages] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchImages = watch("images");

  React.useEffect(() => {
    if (watchImages && watchImages.length > 0) {
      const files = Array.from(watchImages);
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    } else {
      setPreviewImages([]);
    }
  }, [watchImages]);

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Upload images to imgbb
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
        paymentOption: data.paymentOption,
        showOnHome: data.showOnHome || false,
        createdBy: user?.uid || null,
        createdAt: new Date(),
      };

      console.log("Saving product:", productData);

      await axios.post("http://localhost:5000/products", productData);

      toast.success("Product created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
    }
  };

  return (
    <section className="min-h-[80vh] p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <input
            {...register("title", { required: "Product name is required" })}
            placeholder="Product Name / Title"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          {/* Description */}
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Product Description"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* Category */}
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select Category</option>
            <option value="Gents Item">Gents Item</option>
            <option value="Ladies Attire">Ladies Attire</option>
            <option value="Kids Specials ">Kids Specials</option>
            <option value="Exclusive">Exclusive</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}

          {/* Price */}
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required", min: 0 })}
            placeholder="Price"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}

          {/* Available Quantity */}
          <input
            type="number"
            {...register("availableQuantity", {
              required: "Available quantity is required",
              min: 0,
            })}
            placeholder="Available Quantity"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.availableQuantity && (
            <p className="text-red-500 text-sm">
              {errors.availableQuantity.message}
            </p>
          )}

          {/* MOQ */}
          <input
            type="number"
            {...register("moq", {
              required: "Minimum order quantity is required",
              min: 1,
            })}
            placeholder="Minimum Order Quantity (MOQ)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.moq && (
            <p className="text-red-500 text-sm">{errors.moq.message}</p>
          )}

          {/* Multiple Images Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("images", {
                required: "At least one image is required",
              })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}

            {/* Preview Images */}
            {previewImages.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {previewImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Preview ${i}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Demo Video Link */}
          <input
            type="url"
            {...register("demoVideo")}
            placeholder="Demo Video Link (optional)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />

          {/* Payment Options */}
          <div className="space-y-2">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Payment Options
            </p>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Cash on Delivery"
                {...register("paymentOption", {
                  required: "Select at least one payment option",
                })}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="PayFirst"
                {...register("paymentOption")}
              />
              PayFirst
            </label>

            {errors.paymentOption && (
              <p className="text-red-500 text-sm">
                {errors.paymentOption.message}
              </p>
            )}
          </div>

          {/* Show on Home */}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              {...register("showOnHome")}
              className="w-4 h-4"
            />
            Show on Home Page
          </label>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
