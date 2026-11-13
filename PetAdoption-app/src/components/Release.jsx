import { useState } from "react";
import useAuth from "../useAuth";
import "./Release.css";

function Release() {
  const { user } = useAuth();
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
          Tell us about your pet and how we can reach you to discuss next steps.
        </p>
        <label htmlFor="release-pet-name">Pet name</label>
        <input id="release-pet-name" maxLength="80" name="petName" required />
        <label htmlFor="release-pet-type">Pet type</label>
        <select id="release-pet-type" name="petType" required defaultValue="">
          <option value="" disabled>Select a pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="release-breed">Breed (if known)</label>
        <input id="release-breed" maxLength="80" name="breed" />
        <label htmlFor="release-age">Age</label>
        <input
          id="release-age"
          maxLength="40"
          name="age"
          placeholder="e.g. 2 years, or unknown"
          required
        />
        <label htmlFor="release-sex">Sex</label>
        <select id="release-sex" name="sex" required defaultValue="">
          <option value="" disabled>Select an option</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="unknown">Unknown</option>
        </select>
        <label htmlFor="release-health">Health and temperament</label>
        <textarea
          id="release-health"
          maxLength="1000"
          name="healthAndTemperament"
          placeholder="Share known health, vaccination, behavior, and care details."
          required
          rows="4"
        />
        <label htmlFor="release-reason">Reason for rehoming</label>
        <textarea
          id="release-reason"
          maxLength="500"
          name="reason"
          required
          rows="3"
        />
        <label htmlFor="release-location">Your area or postal code</label>
        <input
          autoComplete="postal-code"
          id="release-location"
          maxLength="80"
          name="location"
          required
        />
        <label htmlFor="release-contact-name">Your name</label>
        <input
          autoComplete="name"
          defaultValue={user.name}
          id="release-contact-name"
          maxLength="80"
          name="contactName"
          required
        />
        <label htmlFor="release-contact-email">Your email</label>
        <input
          autoComplete="email"
          defaultValue={user.email}
          id="release-contact-email"
          name="contactEmail"
          required
          type="email"
        />
        <label htmlFor="release-contact-phone">Phone number</label>
        <input
          autoComplete="tel"
          id="release-contact-phone"
          maxLength="30"
          name="contactPhone"
          required
          type="tel"
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