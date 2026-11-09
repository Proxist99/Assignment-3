import React, { useState } from "react";
import "./AdoptForm.css";

function AdoptForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petType: "",
    petName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.petType &&
      formData.petName
    ) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
    setSubmitted(true);
  };

  return (
    <div className="adopt-form-container">
      <h1>Adopt a Pet</h1>
      <form onSubmit={handleSubmit}>
        <ul className="form-list">
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </li>
          <li>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </li>
          <li>
            <label htmlFor="petType">Pet Type:</label>
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
            <label htmlFor="petName">Pet Name:</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </li>
        </ul>
        <button type="submit" className="btn">Submit</button>
      </form>
      {submitted && formComplete && (
        <div>
          <h2>Form Submitted</h2>
          <p>Thank you for your interest in adopting a pet!</p>
        </div>
      )}
      {submitted && !formComplete && (
        <div>
          <h2>Form Incomplete</h2>
          <p>Please fill out all required fields before submitting the form.</p>
        </div>
      )}
    </div>
  );
}

export default AdoptForm;
