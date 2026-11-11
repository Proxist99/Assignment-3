import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../useAuth";
import "./NavBar.css";
import logoImg from "../assets/logo.PNG";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link className="app-logo" to="/" onClick={() => setIsOpen(false)}>
        <img src={logoImg} alt="Logo" />
        <h1>Woofs & Meows</h1>
      </Link>

      <ul id="site-navigation" className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/browse" onClick={() => setIsOpen(false)}>
            Browse
          </Link>
        </li>
        <li>
          <Link to="/adopt" onClick={() => setIsOpen(false)}>
            Adopt
          </Link>
        </li>
        <li>
          <Link to="/release" onClick={() => setIsOpen(false)}>
            Rehome
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
        </li>
        {user ? (
          <>
            <li className="nav-greeting">Hi, {user.name}</li>
            <li>
              <button
                className="nav-auth-button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                type="button"
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>Log in</Link>
            </li>
            <li>
              <Link to="/signup" onClick={() => setIsOpen(false)}>Sign up</Link>
            </li>
          </>
        )}
      </ul>

      <button
        type="button"
        className={`hamburger ${isOpen ? "active" : ""}`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="site-navigation"
        onClick={toggleMenu}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </nav>
  );
}

export default NavBar;