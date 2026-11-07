import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Browse.css";

const Browse = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
        setCats(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

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
    </div>
  );
};

export default Browse;