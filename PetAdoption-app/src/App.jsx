import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Browse from "./components/Browse";
import Home from "./components/Home";

function App() {
  return (
    <Router basename="/Assignment-3">
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
