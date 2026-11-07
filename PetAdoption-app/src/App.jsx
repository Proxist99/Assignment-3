import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Browse from "./components/Browse";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <NavBar />
        <main className="app-main">
          <Routes>
            <Route
              path="/home"
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
            <Route path="/" element={<App />} />
            {/* your other routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
