import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>HealthWave</b>
          </Link>
        </li>
        <li>
          <button onClick={() => setDropdownVisible(!dropdownVisible)}>
            Post
          </button>{" "}
          {dropdownVisible && (
            <div className="dropdown-menu">
              {" "}
              <Link
                to="/AddPostPage"
                style={{ textDecoration: "none", color: "black" }}
              >
                <b>Post Blog</b>
              </Link>
              <Link
                to="/PostImage"
                style={{ textDecoration: "none", color: "black" }}
              >
                <b>Add Image </b>
              </Link>
            </div>
          )}
        </li>
        <li>
          <Link to="/Search" style={{ textDecoration: "none", color: "white" }}>
            <b>Search</b>
          </Link>
        </li>
        <li>
          <Link
            to="/Message"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Messages</b>
          </Link>
        </li>
        <li>
          <Link
            to="/MyProfile"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Profile</b>
          </Link>
        </li>
        <li>
          <Link
            to="/MyFavorites"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Favorites</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
