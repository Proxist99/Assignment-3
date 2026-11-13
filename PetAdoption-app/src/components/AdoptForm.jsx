import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../useAuth";
import "./AdoptForm.css";

function AdoptForm() {
  const { user } = useAuth();
  const { state } = useLocation();
  const selectedPet = state?.pet ?? {};
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "",
    petType: selectedPet.type ?? "",
    petName: selectedPet.name ?? "",
    homeType: "",
    petExperience: "",
    motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="adopt-form-container">
      <header className="adopt-form-heading">
        <p className="adopt-form-eyebrow">A new best friend is waiting</p>
        <h1>Start your adoption journey</h1>
        <p>
          Share a little about your home and the pet you hope to welcome home.
          We’ll use this as an initial adoption enquiry.
        </p>
      </header>
      <form className="adopt-form" onSubmit={handleSubmit}>
        <ul className="form-list">
          <li>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              maxLength="80"
              required
            />
          </li>
          <li>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              readOnly
              required
            />
          </li>
          <li>
            <label htmlFor="phone">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              maxLength="30"
              required
            />
          </li>
          <li>
            <label htmlFor="petType">Pet type</label>
            <select
              id="petType"
              name="petType"
              value={formData.petType}
              onChange={handleChange}
              required
            >
              <option value="">Select a pet type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </li>
          <li>
            <label htmlFor="petName">Pet name</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              maxLength="80"
              required
            />
          </li>
          <li>
            <label htmlFor="homeType">What type of home do you live in?</label>
            <select
              id="homeType"
              name="homeType"
              value={formData.homeType}
              onChange={handleChange}
              required
            >
              <option value="">Select your home type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment or condominium</option>
              <option value="other">Other</option>
            </select>
          </li>
          <li className="form-list-full">
            <label htmlFor="petExperience">
              Have you cared for pets before? (optional)
            </label>
            <textarea
              id="petExperience"
              name="petExperience"
              value={formData.petExperience}
              onChange={handleChange}
              maxLength="600"
              rows="3"
            />
          </li>
          <li className="form-list-full">
            <label htmlFor="motivation">Why are you interested in this pet?</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              maxLength="600"
              required
              rows="3"
            />
          </li>
        </ul>
        <button type="submit" className="btn">Send adoption enquiry</button>
      </form>
      {submitted && (
        <div className="adopt-form-message" role="status">
          <h2>Your enquiry is ready!</h2>
          <p>
            Thanks, {formData.name}. We appreciate your interest in{" "}
            {formData.petName}. Your enquiry is not sent to a server in this demo.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdoptForm;
