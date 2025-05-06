import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const LoginForm = ({ onSuccess, onSwitchToSignup, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.errors
            ? data.errors[0].msg
            : "Login failed. Please check your credentials."
        );
      }

      login(data.token); // Update auth state
      onSuccess(); // Call the success handler passed via props (e.g., close modal, navigate)
      navigate("/client/dashboard"); // Navigate after successful login
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gray-800 pt-16 pb-8 px-8 rounded-xl shadow-2xl w-full max-w-md border border-emerald-500/30 relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white text-sm font-bold"
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Login to MediElite
      </h2>
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="login-email" // Unique ID
            className="block text-sm font-medium text-emerald-300 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="login-email" // Unique ID
            value={email}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>
        <div className="relative">
          {" "}
          {/* Wrapper for positioning */}
          <label
            htmlFor="login-password" // Unique ID
            className="block text-sm font-medium text-emerald-300 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type
            name="password"
            id="login-password" // Unique ID
            value={password}
            onChange={onChange}
            required
            minLength="6"
            className="w-full px-4 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400 hover:text-emerald-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-medium text-emerald-400 hover:text-emerald-300 underline bg-transparent border-none cursor-pointer"
        >
          Sign up here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
