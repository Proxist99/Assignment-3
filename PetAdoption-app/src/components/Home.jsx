import "./Home.css";
import majesty from "../assets/majesty.avif";
import orangy from "../assets/orangy.jpg";
import moopy from "../assets/moopy.jpg";
import { Link } from "react-router-dom";

function Home() {
  const cats = [
    { name: "Majesty", image: majesty },
    { name: "Orangy", image: orangy },
    { name: "Moopy", image: moopy },
  ];

  return (
    <>
      <section className="app-welcome">
        <h1 className="app-welcome-h1">
          Welcome to Woofs & Meows!
        </h1>
        <p className="app-welcome__eyebrow">
          A new friend is waiting
        </p>
        <Link className="app-welcome__cta" to="/browse">
          Browse adoptable pets
        </Link>
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
