import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Browse from "./components/Browse";
import Home from "./components/Home";
import About from "./components/About";
// import Contact from "./components/Contact";
import Adopt from "./components/AdoptForm";

function App() {
  return (
    <>
      <Router basename="/Assignment-3/">
        <div className="app-shell">
          <NavBar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/adopt" element={<Adopt />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </main>
        </div>
      </Router>

      <div className="app-footer">
        <p>&copy; 2026 Woofs & Meows. All rights reserved.</p>
        <hr />
        <ul>
          <h3>Contact Us</h3>
          <p>
            If you have any questions or inquiries, please feel free to reach out
            to us:
          </p>
          <li>Email: petadoption@mail.com</li>
          <li>Phone: +65 8234 5678</li>
          <li>Address: 123 Pet Adoption Street, Singapore, 123456</li>
        </ul>
      </div>
    </>
  );
}

export default App;
