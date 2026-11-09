import React from "react";
import "./AboutContact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <ul>
        <p>
          If you have any questions or inquiries, please feel free to reach out
          to us using the contact information below:
        </p>
        <li>Email: petadoption@mail.com</li>
        <li>Phone: +65 8234 5678</li>
        <li>Address: 123 Pet Adoption Street, Singapore, 123456</li>
      </ul>
    </div>
  );
};

export default Contact;
