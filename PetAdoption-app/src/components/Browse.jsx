import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Browse.css";

const petNames = {
  cat: ["Mochi", "Luna", "Olive", "Pepper", "Miso", "Poppy"],
  dog: ["Milo", "Scout", "Teddy", "Coco", "Archie", "Sunny"],
};

const favoriteStorageKey = "woofsAndMeowsFavorites";

function isStoredFavorite(favorite) {
  if (
    !favorite
    || !["cat", "dog"].includes(favorite.type)
    || typeof favorite.key !== "string"
    || typeof favorite.id !== "string"
    || typeof favorite.url !== "string"
    || typeof favorite.breed !== "string"
  ) {
    return false;
  }

  try {
    const url = new URL(favorite.url);
    const apiDomain = favorite.type === "cat" ? "thecatapi.com" : "thedogapi.com";
    return url.protocol === "https:"
      && (url.hostname === apiDomain || url.hostname.endsWith(`.${apiDomain}`));
  } catch {
    return false;
  }
}

function loadFavorites() {
  try {
    const storedFavorites = window.localStorage.getItem(favoriteStorageKey);
    if (!storedFavorites) {
      return { favorites: [], error: "" };
    }

    const favorites = JSON.parse(storedFavorites);
    if (!Array.isArray(favorites) || !favorites.every(isStoredFavorite)) {
      throw new Error("Saved favorites have an invalid format.");
    }

    return { favorites, error: "" };
  } catch (storageError) {
    console.error("Unable to load saved favorites:", storageError.message);
    return {
      favorites: [],
      error: "Saved favorites could not be loaded from this browser.",
    };
  }
}

const getFavoriteKey = (type, pet) => `${type}:${pet.id ?? pet.url}`;

function Browse() {
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);
  const catPetsRef = useRef([]);
  const dogPetsRef = useRef([]);
  const [catLoading, setCatLoading] = useState(true);
  const [dogLoading, setDogLoading] = useState(true);
  const [catError, setCatError] = useState("");
  const [dogError, setDogError] = useState("");
  const [catLoadMoreMessage, setCatLoadMoreMessage] = useState("");
  const [dogLoadMoreMessage, setDogLoadMoreMessage] = useState("");
  const [favoriteState, setFavoriteState] = useState(loadFavorites);
  const { favorites, error: favoriteError } = favoriteState;

  const fetchPets = useCallback(async (type, append = false) => {
    const isCat = type === "cat";
    const setPets = isCat ? setCats : setDogs;
    const petsRef = isCat ? catPetsRef : dogPetsRef;
    const setLoading = isCat ? setCatLoading : setDogLoading;
    const setError = isCat ? setCatError : setDogError;
    const setLoadMoreMessage = isCat
      ? setCatLoadMoreMessage
      : setDogLoadMoreMessage;

    setLoading(true);
    setError("");
    setLoadMoreMessage("");
    try {
      const endpoint = isCat
        ? "https://api.thecatapi.com/v1/images/search?limit=6"
        : "https://api.thedogapi.com/v1/images/search?limit=6";
      const response = await axios.get(endpoint);
      if (append) {
        const existingIds = new Set(
          petsRef.current.map((pet) => String(pet.id ?? pet.url)),
        );
        const newPets = response.data.filter(
          (pet) => !existingIds.has(String(pet.id ?? pet.url)),
        );
        const updatedPets = [...petsRef.current, ...newPets];
        petsRef.current = updatedPets;
        setPets(updatedPets);

        if (!newPets.length) {
          setLoadMoreMessage(`No new ${type} photos were returned. Try again.`);
        }
      } else {
        petsRef.current = response.data;
        setPets(response.data);
      }
    } catch (requestError) {
      console.error(`Unable to load ${type} photos:`, requestError.message);
      setError(`We couldn't load ${type} photos just now. Please try again.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void fetchPets("cat");
      void fetchPets("dog");
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [fetchPets]);

  const saveFavorites = (nextFavorites) => {
    try {
      window.localStorage.setItem(
        favoriteStorageKey,
        JSON.stringify(nextFavorites),
      );
      setFavoriteState({ favorites: nextFavorites, error: "" });
    } catch (storageError) {
      console.error("Unable to save favorites:", storageError.message);
      setFavoriteState((currentState) => ({
        ...currentState,
        error: "Favorites could not be saved in this browser.",
      }));
    }
  };

  const toggleFavorite = (pet, type) => {
    const key = getFavoriteKey(type, pet);
    const existingFavorite = favorites.find((favorite) => favorite.key === key);
    const nextFavorites = existingFavorite
      ? favorites.filter((favorite) => favorite.key !== key)
      : [
        ...favorites,
        {
          key,
          id: String(pet.id ?? pet.url),
          type,
          url: pet.url,
          breed: pet.breeds?.[0]?.name ?? "",
        },
      ];

    saveFavorites(nextFavorites);
  };

  const renderPets = (pets, type) => (
    <div className="gallery">
      {pets.map((pet, index) => {
        const name = petNames[type][index % petNames[type].length];
        const breed = pet.breeds?.[0]?.name;
        const isFavorite = favorites.some(
          (favorite) => favorite.key === getFavoriteKey(type, pet),
        );

        return (
          <article className="pet-card" key={pet.id ?? `${type}-${index}`}>
            <img src={pet.url} alt={`${name}, an adoptable ${type}`} loading="lazy" />
            <div className="pet-info">
              <p className="pet-kind">{type === "cat" ? "Cat" : "Dog"}</p>
              <h3>{name}</h3>
              <p>{breed || "Looking for a loving home"}</p>
              <button
                aria-pressed={isFavorite}
                className={`favorite-button ${isFavorite ? "saved" : ""}`}
                onClick={() => toggleFavorite(pet, type)}
                type="button"
              >
                {isFavorite ? "Saved" : "Save favorite"}
              </button>
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

  const renderPetSection = ({
    type,
    title,
    description,
    pets,
    loading,
    error,
    loadMoreMessage,
  }) => (
    <section className="pet-section" aria-labelledby={`${type}s-heading`}>
      <div className="pet-section-heading">
        <h2 id={`${type}s-heading`}>{title}</h2>
        <p>{description}</p>
      </div>
      {error && (
        <div className="browse-error" role="alert">
          <p>{error}</p>
          <button
            onClick={() => fetchPets(type, pets.length > 0)}
            type="button"
          >
            Try again
          </button>
        </div>
      )}
      {loading && !pets.length ? (
        <p className="browse-status" role="status">
          Finding lovely {title.toLowerCase()} for you…
        </p>
      ) : pets.length ? (
        renderPets(pets, type)
      ) : !error ? (
        <p className="browse-status" role="status">
          No photos are available right now.
        </p>
      ) : null}
      {loadMoreMessage && (
        <p className="browse-status" role="status">{loadMoreMessage}</p>
      )}
      {!error && pets.length > 0 && (
        <div className="pet-load-more">
          <button
            disabled={loading}
            onClick={() => fetchPets(type, true)}
            type="button"
          >
            {loading ? `Loading more ${title.toLowerCase()}...` : `Load more ${title.toLowerCase()}`}
          </button>
        </div>
      )}
    </section>
  );

  return (
    <div className="browse-container">
      <header className="browse-heading">
        <p className="browse-eyebrow">Find your new best friend</p>
        <h1>Meet the pets</h1>
        <p>Every companion has a story. Maybe yours starts here.</p>
      </header>

      {renderPetSection({
        type: "cat",
        title: "Cats",
        description: "Curious, cozy, and full of character.",
        pets: cats,
        loading: catLoading,
        error: catError,
        loadMoreMessage: catLoadMoreMessage,
      })}
      {renderPetSection({
        type: "dog",
        title: "Dogs",
        description: "Ready to make every day a little brighter.",
        pets: dogs,
        loading: dogLoading,
        error: dogError,
        loadMoreMessage: dogLoadMoreMessage,
      })}

      <section className="favorites-section" aria-labelledby="favorites-heading">
        <div className="pet-section-heading">
          <h2 id="favorites-heading">Saved favorites</h2>
          <p>Your saved photos stay in this browser.</p>
        </div>
        {favoriteError && (
          <p className="favorites-error" role="alert">{favoriteError}</p>
        )}
        {favorites.length ? (
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <article className="pet-card" key={favorite.key}>
                <img
                  alt={`${favorite.breed || "Saved"} ${favorite.type} photo`}
                  loading="lazy"
                  src={favorite.url}
                />
                <div className="pet-info">
                  <p className="pet-kind">
                    {favorite.type === "cat" ? "Cat photo" : "Dog photo"}
                  </p>
                  <h3>{favorite.breed || "Saved photo"}</h3>
                  <button
                    className="favorite-button saved"
                    onClick={() => saveFavorites(
                      favorites.filter((item) => item.key !== favorite.key),
                    )}
                    type="button"
                  >
                    Remove favorite
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="browse-status">You haven't saved any favorites yet.</p>
        )}
      </section>
    </div>
  );
}

export default Browse;
