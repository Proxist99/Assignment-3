import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Browse.css";

const petNames = {
  cat: ["Mochi", "Luna", "Olive", "Pepper", "Miso", "Poppy"],
  dog: ["Milo", "Scout", "Teddy", "Coco", "Archie", "Sunny"],
};

function Browse() {
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPets = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [catResponse, dogResponse] = await Promise.all([
        axios.get("https://api.thecatapi.com/v1/images/search?limit=6"),
        axios.get("https://api.thedogapi.com/v1/images/search?limit=6"),
      ]);
      setCats(catResponse.data);
      setDogs(dogResponse.data);
    } catch (requestError) {
      console.error("Unable to load pets:", requestError.message);
      setError("We couldn't load the pet photos just now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void fetchPets();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [fetchPets]);

  const renderPets = (pets, type) => (
    <div className="gallery">
      {pets.map((pet, index) => {
        const name = petNames[type][index % petNames[type].length];
        const breed = pet.breeds?.[0]?.name;

        return (
          <article className="pet-card" key={pet.id ?? `${type}-${index}`}>
            <img src={pet.url} alt={`${name}, an adoptable ${type}`} loading="lazy" />
            <div className="pet-info">
              <p className="pet-kind">{type === "cat" ? "Cat" : "Dog"}</p>
              <h3>{name}</h3>
              <p>{breed || "Looking for a loving home"}</p>
              <Link
                className="adopt-button"
                to="/adopt"
                state={{ pet: { name, type } }}
              >
                Meet {name}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );

  return (
    <div className="browse-container">
      <header className="browse-heading">
        <p className="browse-eyebrow">Find your new best friend</p>
        <h1>Meet the pets</h1>
        <p>Every companion has a story. Maybe yours starts here.</p>
      </header>

      {error && (
        <div className="browse-error" role="alert">
          <p>{error}</p>
          <button onClick={fetchPets} type="button">Try again</button>
        </div>
      )}

      {loading ? (
        <p className="browse-status" role="status">Finding lovely pets for you…</p>
      ) : !error ? (
        <>
          <section className="pet-section" aria-labelledby="cats-heading">
            <div className="pet-section-heading">
              <h2 id="cats-heading">Cats</h2>
              <p>Curious, cozy, and full of character.</p>
            </div>
            {renderPets(cats, "cat")}
          </section>
          <section className="pet-section" aria-labelledby="dogs-heading">
            <div className="pet-section-heading">
              <h2 id="dogs-heading">Dogs</h2>
              <p>Ready to make every day a little brighter.</p>
            </div>
            {renderPets(dogs, "dog")}
          </section>
        </>
      ) : null}

      {!loading && (
        <div className="button-container">
          <p>Want to see more friends?</p>
          <button onClick={fetchPets} type="button">Show me more pets</button>
        </div>
      )}
    </div>
  );
}

export default Browse;
