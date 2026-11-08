import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Browse from "./components/Browse";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Adopt from "./components/AdoptForm";

function App() {
  return (
    <>
      <Router basename="/Assignment-3/">
        <div className="app-shell">
          <NavBar />
          <main className="app-main">
            <Routes>
              <Route
                path="/"
                element={
                  <section className="app-welcome">
                    <p className="app-welcome__eyebrow">
                      A new friend is waiting
                    </p>
                    <Home />
                    <Link className="app-welcome__cta" to="/browse">
                      Browse adoptable pets
                    </Link>
                  </section>
                }
              />
              <Route path="/browse" element={<Browse />} />
              <Route path="/adopt" element={<Adopt />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>

      <>
        <div className="pet-grid">
          
        </div>
      </>

      <div className="app-footer">
        <p>&copy; 2026 Pet Adoption. All rights reserved.</p>
        <hr />
        <ul>
          <h3>Contact Us</h3>
          <li>Email: petadoption@mail.com</li>
          <li>Phone: +65 8234 5678</li>
          <li>Address: 123 Pet Adoption Street, Singapore, 123456</li>
        </ul>
      </div>
    </>
  );
}

export default App;
