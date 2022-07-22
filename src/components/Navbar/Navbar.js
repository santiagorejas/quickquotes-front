import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import classes from "./Navbar.module.css";

const activeLinkStyle = {
  borderBottom: "2px solid #eee",
  paddingBottom: "0.3rem",
};

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className={classes["navbar"]}>
      <ul className={classes["navbar__links"]}>
        <li>
          <NavLink
            to="/"
            className={classes["navbar__link"]}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink
              to="/login"
              className={classes["navbar__link"]}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              <span>Login</span>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              to="/favorites"
              className={classes["navbar__link"]}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <i className="fa-solid fa-heart"></i>
              <span>Favorites</span>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button
              onClick={logout}
              className={classes["navbar__link"]}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
