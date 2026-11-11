import { useEffect, useState } from "react";
import "./Home.css";
import majesty from "../assets/majesty.avif";
import orangy from "../assets/orangy.jpg";
import moopy from "../assets/moopy.jpg";
import { Link } from "react-router-dom";

const heroSlides = [
  { name: "Majesty", image: majesty, position: "center 34%" },
  { name: "Orangy", image: orangy, position: "center 30%" },
  { name: "Moopy", image: moopy, position: "center 28%" },
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cats = [
    { name: "Majesty", image: majesty },
    { name: "Orangy", image: orangy },
    { name: "Moopy", image: moopy },
  ];

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const showSlide = (slideIndex) => {
    setActiveSlide((slideIndex + heroSlides.length) % heroSlides.length);
  };

  return (
    <>
      <section
        className="app-welcome"
        aria-label="Featured pets"
        aria-roledescription="carousel"
      >
        <div className="hero-slides" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              className={`hero-slide ${index === activeSlide ? "active" : ""}`}
              key={slide.name}
            >
              <img
                src={slide.image}
                alt=""
                style={{ objectPosition: slide.position }}
              />
            </div>
          ))}
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content" aria-live="polite">
          <p className="app-welcome__eyebrow">A new best friend is waiting</p>
          <h1 className="app-welcome-h1">
            Meet {heroSlides[activeSlide].name}
          </h1>
          <p className="hero-description">
            Find a friend to fill your days with joy, comfort, and plenty of
            happy moments.
          </p>
          <Link className="app-welcome__cta" to="/browse">
            Browse adoptable pets
          </Link>
        </div>
        <div className="hero-controls" aria-label="Featured pet controls">
          <button
            aria-label="Show previous featured pet"
            className="hero-arrow"
            onClick={() => showSlide(activeSlide - 1)}
            type="button"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div className="hero-dots" aria-label="Choose a featured pet">
            {heroSlides.map((slide, index) => (
              <button
                aria-label={`Show ${slide.name}`}
                aria-current={index === activeSlide ? "true" : undefined}
                className={`hero-dot ${index === activeSlide ? "active" : ""}`}
                key={slide.name}
                onClick={() => showSlide(index)}
                type="button"
              />
            ))}
          </div>
          <button
            aria-label="Show next featured pet"
            className="hero-arrow"
            onClick={() => showSlide(activeSlide + 1)}
            type="button"
          >
            <span aria-hidden="true">›</span>
          </button>
          <button
            aria-label={isPaused ? "Play featured pet slideshow" : "Pause featured pet slideshow"}
            className="hero-pause"
            onClick={() => setIsPaused((paused) => !paused)}
            type="button"
          >
            {isPaused ? "Play" : "Pause"}
          </button>
        </div>
      </section>


      <div className="welcome">
        <hr />
        <h2>Welcome to Bark & Purr</h2>
        <p><b>Looking for pets?</b></p>
      </div >

      <div className="pet-grid">
        {cats.map((cat) => (
          <Link
            key={cat.name}
            className="pet-card"
            to="/adopt"
            state={{ pet: { name: cat.name, type: "cat" } }}
          >
            <img src={cat.image} alt={cat.name} />
            <p>Meet {cat.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;
