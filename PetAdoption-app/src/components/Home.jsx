import { useEffect, useState } from "react";
import "./Home.css";
import majesty from "../assets/majesty.avif";
import orangy from "../assets/orangy.jpg";
import moopy from "../assets/moopy.jpg";
import { Link } from "react-router-dom";

const heroSlides = [
  { name: "Majesty", image: majesty },
  { name: "Orangy", image: orangy },
  { name: "Moopy", image: moopy },
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
              style={{ "--hero-slide-image": `url("${slide.image}")` }}
            >
              <img src={slide.image} alt="" />
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
        <h2>Welcome to Woofs & Meows</h2>
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

      <section className="home-community" aria-label="Community and pet care">
        <section className="community-story" aria-labelledby="reviews-heading">
          <div className="community-story__heading">
            <p className="home-section-eyebrow">Sample reviews</p>
            <h2 id="reviews-heading">Every adoption starts a story</h2>
            <p>Example adopter reviews for demonstration.</p>
          </div>
          <div className="review-grid">
            <figure className="review-card">
              <blockquote>
                Milo took a little time to settle in, and now he greets me at
                the door every evening. Adopting him has made home feel even
                warmer.
              </blockquote>
              <figcaption>
                <strong>Jamie</strong>
                <span>Adopted Milo</span>
              </figcaption>
            </figure>
            <figure className="review-card">
              <blockquote>
                I was a first-time cat owner and appreciated having guidance
                while I got ready to welcome Luna. She has settled in
                beautifully.
              </blockquote>
              <figcaption>
                <strong>Alex</strong>
                <span>Adopted Luna</span>
              </figcaption>
            </figure>
            <figure className="review-card">
              <blockquote>
                Bringing home Pepper was the best decision. We took things
                slowly, and now our daily walks are everyone's favorite part of
                the day.
              </blockquote>
              <figcaption>
                <strong>Sam</strong>
                <span>Adopted Pepper</span>
              </figcaption>
            </figure>
          </div>
          <div className="community-actions">
            <p>
              Have your own adoption story or feedback to share? We'd love to
              hear from you.
            </p>
            <a
              className="community-link"
              href="mailto:woofsnmeows@mail.com?subject=My%20adoption%20story"
            >
              Share your adoption story
            </a>
            <a
              className="community-feedback-link"
              href="mailto:woofsnmeows@mail.com?subject=Website%20feedback"
            >
              Send us feedback
            </a>
          </div>
        </section>

        <div className="care-tips">
          <div className="care-tips__heading">
            <p className="home-section-eyebrow">A happy start</p>
            <h2>Pet care tips</h2>
          </div>
          <article className="care-tip">
            <span className="care-tip__number" aria-hidden="true">01</span>
            <div>
              <h3>Give them time and space</h3>
              <p>
                Set up a quiet, comfortable spot where your new pet can settle
                in at their own pace.
              </p>
            </div>
          </article>
          <article className="care-tip">
            <span className="care-tip__number" aria-hidden="true">02</span>
            <div>
              <h3>Build a gentle routine</h3>
              <p>
                Keep meals, play, walks, and rest as predictable as you can
                while they get used to home.
              </p>
            </div>
          </article>
          <article className="care-tip">
            <span className="care-tip__number" aria-hidden="true">03</span>
            <div>
              <h3>Plan a wellness check</h3>
              <p>
                Arrange a visit with a veterinarian to discuss your pet's
                individual care needs.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;
