import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../assets/logo.PNG"


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="app-logo">
        <img src={logoImg} alt="Logo" />
        <h1>Woofs & Meows</h1>
      </div>
      

      {/* Added nav-links class and backticks for state interpolation */}
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/Browse" onClick={() => setIsOpen(false)}>
            Browse
          </Link>
        </li>
        <li>
          <Link to="/Adopt" onClick={() => setIsOpen(false)}>
            Adopt
          </Link>
        </li>
        <li>
          <Link to="/About" onClick={() => setIsOpen(false)}>
            About
          </Link>
        </li>
        {/* <li>
          <Link to="/Contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </li> */}
      </ul>

      {/* Fixed quotes to backticks here as well */}
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default NavBar;