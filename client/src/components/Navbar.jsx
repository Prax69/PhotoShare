import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav>
      <div className="container">
        <h1>
          <Link to="/">PhotoShare </Link>
        </h1>
        <div className="flex">
          {user ? (
            <>
              <Link to="/upload" className="Upload">
                Upload
              </Link>
              <button onClick={handleLogout} className="Logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="Login">
                Login
              </Link>
              <Link to="/register" className="Register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
