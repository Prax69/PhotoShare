import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // Import your Auth context
import { loginUser } from "../utils/api"; // Import your API utility
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState(""); // Updated to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const { data } = await loginUser({ username, password }); // API call with username
      login(data); // Update AuthContext with the user data
      localStorage.setItem("token", data.token); // Save the token in localStorage
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="text-center">
          Don’t have an account?{" "}
          <a href="/register" className="login-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );

};

export default Login;
