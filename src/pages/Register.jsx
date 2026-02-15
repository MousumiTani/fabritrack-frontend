import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Shared/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const selectedRole = watch("role");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const onSubmit = async (data) => {
    try {
      await registerUser(
        data.email,
        data.password,
        data.name,
        data.photoURL,
        data.role,
        data.managerCode,
      );
      toast.success("Registration successful");

      if (data.role === "manager") navigate("/dashboard/add-product");
      else if (data.role === "admin") navigate("/dashboard/all-orders");
      else navigate("/dashboard/my-orders");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Registration failed",
      );
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="input"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="email"
            {...register("email", { required: "Email required" })}
            placeholder="Email"
            className="input"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="url"
            {...register("photoURL", { required: "Photo URL required" })}
            placeholder="Profile photo URL"
            className="input"
          />
          {errors.photoURL && (
            <p className="text-red-500">{errors.photoURL.message}</p>
          )}

          <select
            {...register("role", { required: "Role required" })}
            className="input"
          >
            <option value="">Select role</option>
            <option value="buyer">Buyer</option>
            <option value="manager">Manager</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          {selectedRole === "manager" && (
            <input
              type="password"
              {...register("managerCode", {
                required: "Manager code required",
              })}
              placeholder="Manager code"
              className="input"
            />
          )}

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: "Password required",
                pattern: {
                  value: passwordRegex,
                  message: "6+ chars with uppercase & lowercase",
                },
              })}
              placeholder="Password"
              className="input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-bold mx-2 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
