import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "", // For confirmation
  });
  const [error, setError] = useState("");
  const { login } = useAuth(); // Get login function from context
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
    console.log("Signup attempt with:", { name, email }); // Don't log password

    try {
      // Use /api prefix which will be proxied by Vite in development
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Send name, email, password
      });

      const data = await res.json();

      if (!res.ok) {
        // Use error message from backend if available
        throw new Error(
          data.errors ? data.errors[0].msg : "Signup failed. Please try again."
        );
      }

      console.log("Signup successful, token:", data.token);
      login(data.token); // Use context login function to store token and set state
      navigate("/client/dashboard"); // Redirect to dashboard on successful signup
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-teal-500/30">
        <div className="flex justify-center mb-6">
          <img src="/favicon.svg" alt="MediElite Logo" className="w-16 h-16" />
        </div>
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
              htmlFor="name"
              className="block text-sm font-medium text-teal-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-teal-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-teal-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="•••••••• (min. 6 characters)"
            />
          </div>
          <div>
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-teal-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-teal-400 hover:text-teal-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
