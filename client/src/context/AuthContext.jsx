import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api.js";
// import { set } from "mongoose";

// Create the AuthContext
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user data
  const navigate = useNavigate();

  // Function to log in a user
  const login = (userData) => {
    setUser(userData); // Set the user data
    localStorage.setItem("token", userData.token); // Save token to localStorage
  };

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear the user data
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Load the user from localStorage on app start
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const res = await API.get("auth/me");
      setUser(res.data.user);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  fetchUserData();
}, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
