import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { imageUpload } from "../utils"; // 🔹 IMPORT

const Register = () => {
  const { register: registerUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    document.title = "Register";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const onSubmit = async (data) => {
    try {
      // 🔹 get file from react-hook-form
      const imageFile = data.photo[0];

      // 🔹 upload using utils
      const imageUrl = await imageUpload(imageFile);

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      // 🔹 register user
      await registerUser(data.email, data.password, data.name, imageUrl);

      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Image file (native, no label) */}
          <input
            type="file"
            accept="image/*"
            {...register("photo", {
              required: "Profile image is required",
              validate: {
                size: (files) =>
                  files[0]?.size < 2_000_000 || "Image must be under 2MB",
                type: (files) =>
                  ["image/jpeg", "image/png", "image/webp"].includes(
                    files[0]?.type
                  ) || "Only JPG, PNG, WEBP allowed",
              },
            })}
            className="
              w-full
              text-sm font-normal text-gray-500
              border rounded-lg
              px-3 py-1.5
              bg-white dark:bg-gray-700
              dark:border-gray-600
              focus:ring-2 focus:ring-purple-400
              file:mr-3
              file:px-3 file:py-1.5
              file:text-sm file:font-normal
              file:border-0
              file:bg-gray-100 file:text-gray-600
              dark:file:bg-gray-600 dark:file:text-gray-200
            "
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must be 6+ chars with uppercase & lowercase",
                },
              })}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none pr-10 dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
            >
              {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>

        <div className="my-4 text-center text-gray-400 text-sm">OR</div>

        <Button
          onClick={googleLogin}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Sign up with Google
        </Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-gray-500 font-bold mx-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
