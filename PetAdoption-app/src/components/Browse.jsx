import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Browse.css";

const Browse = () => {
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);

  const fetchData = async () => {
    try {
      // Add a cache-busting parameter to ensure new images are fetched
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=6&cb=${Date.now()}`,
      );
      setCats(response.data);
      const response2 = await axios.get(
        `https://pro-api.thedogapi.com/v1/images/search?limit=6&cb=${Date.now()}`,
      );
      setDogs(response2.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Reload = () => {
    fetchData();
  };

  return (
    <div className="browse-container">
      <h2>Browse Cats</h2>
      <div id="gallery" className="gallery">
        {cats.map((cat, index) => (
          <div key={index} className="card">
            <img src={cat.url} alt={`Cat ${index + 1}`} />
            <p>Cat {index + 1}</p>
          </div>
        ))}
      </div>

      <hr />

      <h2>Browse Dogs</h2>
      <div id="gallery" className="gallery">
        {dogs.map((dog, index) => (
          <div key={index} className="card">
            <img src={dog.url} alt={`Dog ${index + 1}`} />
            <p>Dog {index + 1}</p>
          </div>
        ))}
      </div>
      <div className="button-container">
        <p>Press button to refresh!</p>
        <button onClick={Reload} className="btn">Reload</button>
      </div>
    </div>
  );
};

export default Browse;
