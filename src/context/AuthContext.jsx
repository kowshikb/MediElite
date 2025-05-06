import React, { createContext, useState, useContext, useEffect } from "react";
// Import useNavigate
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  // Initialize useNavigate
  const navigate = useNavigate();
  // Add user state if needed: const [user, setUser] = useState(null);

  useEffect(() => {
    // Optional: Add logic here to verify token validity with backend if needed
    // For now, just check presence
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // Optional: Fetch user details based on token
    } else {
      setToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    // Optional: Fetch and set user details
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    // Optional: Clear user details
    // Navigate to home page after logout
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
