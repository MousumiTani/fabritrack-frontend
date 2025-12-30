import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Login";
  }, []);

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google login success");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
          />

          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none pr-10 dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
            >
              {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Login
          </Button>
        </form>

        <div className="my-4 text-center text-gray-400 text-sm">OR</div>

        <Button
          onClick={handleGoogle}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          No account?
          <Link
            to="/register"
            className="text-gray-500 font-bold mx-2 hover:underline"
          >
            Register
          </Link>
        </p>

        <p className="text-center mt-2">
          <Link to="" className="text-purple-600 text-sm">
            Forgot Password?
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
