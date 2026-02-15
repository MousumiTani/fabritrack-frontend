import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Shared/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, googleLogin, role, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: location.state?.email || "", password: "" },
  });

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    if (!loading && role) {
      if (role === "admin")
        navigate("/dashboard/all-orders", { replace: true });
      else if (role === "manager")
        navigate("/dashboard/add-product", { replace: true });
      else navigate("/dashboard/my-orders", { replace: true });
    }
  }, [role, loading, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful");
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-center text-2xl font-bold mb-8">
          Login to Continue
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="input"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">Email required</p>
          )}

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", { required: true })}
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
            <p className="text-red-500 text-xs">Password required</p>
          )}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="my-4 text-center text-gray-400 text-sm">OR</div>
        <Button onClick={handleGoogle} className="w-full">
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          No account?{" "}
          <Link to="/register" className="font-bold mx-2 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
