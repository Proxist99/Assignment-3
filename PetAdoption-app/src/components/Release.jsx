import { useState } from "react";
import "./Release.css";

function Release() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section className="release-page">
      <form className="release-card" onSubmit={handleSubmit}>
        <p className="release-eyebrow">Help a pet find a home</p>
        <h1>Rehome a pet</h1>
        <p>
          Share a few details and our adoption team can learn more about the pet.
        </p>
        <label htmlFor="release-pet-name">Pet name</label>
        <input id="release-pet-name" name="petName" required />
        <label htmlFor="release-pet-type">Pet type</label>
        <select id="release-pet-type" name="petType" required defaultValue="">
          <option value="" disabled>Select a pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="release-age">Age</label>
        <input id="release-age" name="age" placeholder="e.g. 2 years" required />
        <label htmlFor="release-description">About the pet</label>
        <textarea
          id="release-description"
          maxLength="1000"
          name="description"
          required
          rows="4"
        />
        <label htmlFor="release-contact-name">Your name</label>
        <input id="release-contact-name" name="contactName" required />
        <label htmlFor="release-contact-email">Your email</label>
        <input
          autoComplete="email"
          id="release-contact-email"
          name="contactEmail"
          required
          type="email"
        />
        <button className="release-submit" type="submit">Submit pet details</button>
        {submitted && (
          <p className="release-success" role="status">
            Thank you. Your pet details have been submitted for this demo.
          </p>
        )}
        <p className="release-demo-note">
          Demo only: submissions are not sent to a server or saved.
        </p>
      </form>
    </section>
  );
}

export default Release;