import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Browse.css";

const petNames = {
  cat: ["Mochi", "Luna", "Olive", "Pepper", "Miso", "Poppy"],
  dog: ["Milo", "Scout", "Teddy", "Coco", "Archie", "Sunny"],
};

const favoriteStorageKey = "woofsAndMeowsFavorites";

const API_KEYS = {
  cat: "live_OzDOvHWqGRcvwHUQObqtmcDl5Oep9BoN9ltDQ6XyS2Znq1GoQXT2jwlCQKOgabW0", //[cite: 1]
  dog: "live_bC8lHO6dv3ZJF7byckQkvKaNVO1tnusPJKBWE315xjlrXTGqpAruLewDcWn36Wke", //[cite: 2]
};

const CURATED_CAT_BREEDS = [
  "Abyssinian",
  "Bengal",
  "Birman",
  "British Shorthair",
  "Maine Coon",
  "Norwegian Forest Cat",
  "Persian",
  "Ragdoll",
  "Scottish Fold",
  "Siamese",
];

const CURATED_DOG_BREEDS = [
  "Akita",
  "Alaskan Malamute",
  "Border Collie",
  "Australian Cattle Dog",
  "American Bully",
  "American Pit Bull Terrier",
  "Bloodhound",
  "Bullmastiff",
  "Alaskan Husky",
  "Alapaha Blue Blood Bulldog"
];

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

  // Breed lists for dropdown filters (limited to 10 valid breeds)
  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);

  // Selected dropdown filters per section
  const [selectedCatBreed, setSelectedCatBreed] = useState("");
  const [selectedDogBreed, setSelectedDogBreed] = useState("");

  const [catLoading, setCatLoading] = useState(true);
  const [dogLoading, setDogLoading] = useState(true);
  const [catError, setCatError] = useState("");
  const [dogError, setDogError] = useState("");
  const [catLoadMoreMessage, setCatLoadMoreMessage] = useState("");
  const [dogLoadMoreMessage, setDogLoadMoreMessage] = useState("");
  const [favoriteState, setFavoriteState] = useState(loadFavorites);
  const { favorites, error: favoriteError } = favoriteState;

  // Fetch breed metadata dropdown options on mount (filtering out ones without photos/data and taking first 10)
  useEffect(() => {
    async function fetchBreedMetadata() {
      try {
        const [catRes, dogRes] = await Promise.all([
          axios.get("https://api.thecatapi.com/v1/breeds", { headers: { "x-api-key": API_KEYS.cat } }),
          axios.get("https://api.thedogapi.com/v1/breeds", { headers: { "x-api-key": API_KEYS.dog } })
        ]);

        const validCats = catRes.data.filter(b => CURATED_CAT_BREEDS.includes(b.name));
        const validDogs = dogRes.data.filter(b => CURATED_DOG_BREEDS.includes(b.name));

        setCatBreeds(validCats);
        setDogBreeds(validDogs);
      } catch (err) {
        console.error("Failed to load breed lists", err);
      }
    }
    fetchBreedMetadata();
  }, []);

  const fetchPets = useCallback(async (type, breedId = "", append = false) => {
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
      let endpoint = isCat
        ? `https://api.thecatapi.com/v1/images/search?limit=6&has_breeds=1`
        : `https://api.thedogapi.com/v1/images/search?limit=6&has_breeds=1`;

      if (breedId) {
        endpoint += `&breed_ids=${breedId}`;
      }

      const response = await axios.get(endpoint, {
        headers: { "x-api-key": API_KEYS[type] }
      });

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

  // Trigger fetches when selected breed dropdown changes
  useEffect(() => {
    void fetchPets("cat", selectedCatBreed, false);
  }, [selectedCatBreed, fetchPets]);

  useEffect(() => {
    void fetchPets("dog", selectedDogBreed, false);
  }, [selectedDogBreed, fetchPets]);

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

  const renderPets = (pets, type, breedsList = [], selectedBreedId = "") => {
    if (!pets.length) {
      return <p className="browse-status">No pets match this breed selection.</p>;
    }

    // Find the full breed object from the dropdown list if a breed is selected
    const activeBreedObj = breedsList.find(
      (b) => String(b.id) === String(selectedBreedId)
    );

    return (
      <div className="gallery">
        {pets.map((pet, index) => {
          const name = petNames[type][index % petNames[type].length];
          // Prefer embedded breed info, fallback to the selected dropdown breed object
          const breedInfo = pet.breeds?.[0] || activeBreedObj;
          const isFavorite = favorites.some(
            (favorite) => favorite.key === getFavoriteKey(type, pet),
          );

          return (
            <article className="pet-card" key={pet.id ?? `${type}-${index}`}>
              <img src={pet.url} alt={`${name}, an adoptable ${type}`} loading="lazy" />
              <div className="pet-info">
                <p className="pet-kind">{type === "cat" ? "Cat" : "Dog"}</p>
                <h3>{name}</h3>
                <p>{breedInfo?.name || "Looking for a loving home"}</p>
                {breedInfo?.temperament && (
                  <p style={{ fontSize: "0.82rem", color: "#59665d" }}>
                    <strong>Temperament:</strong> {breedInfo.temperament}
                  </p>
                )}
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
  };

  const renderPetSection = ({
    type,
    title,
    description,
    pets,
    loading,
    error,
    loadMoreMessage,
    breedsList,
    selectedBreed,
    setSelectedBreed,
  }) => (
    <section className="pet-section" aria-labelledby={`${type}s-heading`}>
      <div className="pet-section-heading">
        <h2 id={`${type}s-heading`}>{title}</h2>
        <p>{description}</p>
      </div>

      {/* Breed Filter Dropdown Only */}
      <div className="breed-filter-controls" style={{ marginBottom: '1.25rem' }}>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #dfe7df', fontFamily: 'inherit', width: '240px' }}
        >
          <option value="">All {title} Breeds</option>
          {breedsList.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="browse-error" role="alert">
          <p>{error}</p>
          <button
            onClick={() => fetchPets(type, selectedBreed, pets.length > 0)}
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
            onClick={() => fetchPets(type, selectedBreed, true)}
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
        breedsList: catBreeds,
        selectedBreed: selectedCatBreed,
        setSelectedBreed: setSelectedCatBreed,
      })}

      {renderPetSection({
        type: "dog",
        title: "Dogs",
        description: "Ready to make every day a little brighter.",
        pets: dogs,
        loading: dogLoading,
        error: dogError,
        loadMoreMessage: dogLoadMoreMessage,
        breedsList: dogBreeds,
        selectedBreed: selectedDogBreed,
        setSelectedBreed: setSelectedDogBreed,
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