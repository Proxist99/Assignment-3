import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import "./Auth.css";

function Signup() {
  const { signup, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const destination = location.state?.from?.pathname || "/";
  const destinationState = location.state?.from?.state;

  if (user) {
    return <Navigate to={destination} state={destinationState} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");

    if (password !== formData.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    try {
      signup(formData.get("name"), formData.get("email"), password);
      navigate(destination, { state: destinationState, replace: true });
    } catch (signupError) {
      setError(signupError.message);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="auth-eyebrow">Join our community</p>
        <h1>Create an account</h1>
        <p className="auth-description">
          Sign up to start finding a new companion.
        </p>
        <label htmlFor="signup-name">Name</label>
        <input
          autoComplete="name"
          id="signup-name"
          maxLength="80"
          name="name"
          required
          type="text"
        />
        <label htmlFor="signup-email">Email</label>
        <input
          autoComplete="email"
          id="signup-email"
          name="email"
          required
          type="email"
        />
        <label htmlFor="signup-password">Password</label>
        <input
          autoComplete="new-password"
          id="signup-password"
          minLength="8"
          name="password"
          required
          type="password"
        />
        <label htmlFor="signup-confirm-password">Confirm password</label>
        <input
          autoComplete="new-password"
          id="signup-confirm-password"
          minLength="8"
          name="confirmPassword"
          required
          type="password"
        />
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="auth-submit" type="submit">Create account</button>
        <p className="auth-switch">
          Already have an account? <Link to="/login" state={location.state}>Log in</Link>
        </p>
        <p className="auth-demo-note">
          Demo only: accounts are kept in memory and reset when the app reloads.
        </p>
      </form>
    </section>
  );
}

export default Signup;