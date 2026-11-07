import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <h1>Pet Adoption</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Browse">Browse</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
