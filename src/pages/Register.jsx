import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../components/Button";

const Register = () => {
  const { register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      toast.error("Password must be >=6, include uppercase & lowercase");
      return;
    }
    try {
      await register(email, password, name, photoURL);
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
            required
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
            required
          />

          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Photo URL"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none pr-10 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
            >
              {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>

            <p className="text-xs text-gray-400 mt-1">
              At least 6 characters, uppercase & lowercase
            </p>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Register
          </Button>
        </form>

        <div className="my-4 text-center text-gray-400 text-sm">OR</div>

        <Button
          onClick={() => googleLogin()}
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
