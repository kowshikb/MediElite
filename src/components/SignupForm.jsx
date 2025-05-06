import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const SignupForm = ({ onSuccess, onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const { login } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.errors ? data.errors[0].msg : "Signup failed. Please try again."
        );
      }

      login(data.token); // Update auth state
      onSuccess(); // Call the success handler passed via props
      navigate("/client/dashboard"); // Navigate after successful signup
    } catch (err) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-gray-800 pt-16 pb-8 px-8 rounded-xl shadow-2xl w-full max-w-md border border-teal-500/30 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-sm font-bold z-20"
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Create MediElite Account
      </h2>
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="signup-name" // Unique ID
            className="block text-sm font-medium text-teal-300 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="signup-name" // Unique ID
            value={name}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Your Name"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="signup-email" // Unique ID
            className="block text-sm font-medium text-teal-300 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="signup-email" // Unique ID
            value={email}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>
        <div className="relative">
          {" "}
          {/* Wrapper for positioning */}
          <label
            htmlFor="signup-password" // Unique ID
            className="block text-sm font-medium text-teal-300 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type
            name="password"
            id="signup-password" // Unique ID
            value={password}
            onChange={onChange}
            required
            minLength="6"
            className="w-full px-4 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="•••••••• (min. 6 characters)"
            disabled={loading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400 hover:text-teal-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative">
          {" "}
          {/* Wrapper for positioning */}
          <label
            htmlFor="signup-password2" // Unique ID
            className="block text-sm font-medium text-teal-300 mb-1"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"} // Toggle input type
            name="password2"
            id="signup-password2" // Unique ID
            value={password2}
            onChange={onChange}
            required
            minLength="6"
            className="w-full px-4 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400 hover:text-teal-300"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-teal-400 hover:text-teal-300 underline bg-transparent border-none cursor-pointer"
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
