import React from "react";
import "./Home.css";
import majesty from "../assets/majesty.avif";
import orangy from "../assets/orangy.jpg";
import moopy from "../assets/moopy.jpg";

function Home() {
  const cats = [
    { name: "Majesty", image: majesty },
    { name: "Orangy", image: orangy },
    { name: "Moopy", image: moopy },
  ];

  return (
    <div className="pet-grid">
      {cats.map((cat, index) => (
        <div key={index} className="pet-card">
          <img src={cat.image} alt={cat.name} />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
