import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import "./Auth.css";

function Login() {
  const { login, user } = useAuth();
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

    try {
      login(formData.get("email"), formData.get("password"));
      navigate(destination, { state: destinationState, replace: true });
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="auth-eyebrow">Welcome back</p>
        <h1>Log in</h1>
        <p className="auth-description">
          Sign in to continue your adoption journey.
        </p>
        <label htmlFor="login-email">Email</label>
        <input
          autoComplete="email"
          id="login-email"
          name="email"
          required
          type="email"
        />
        <label htmlFor="login-password">Password</label>
        <input
          autoComplete="current-password"
          id="login-password"
          name="password"
          required
          type="password"
        />
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="auth-submit" type="submit">Log in</button>
        <p className="auth-switch">
          New here? <Link to="/signup" state={location.state}>Create an account</Link>
        </p>
        <p className="auth-demo-note">
          Demo only: accounts are kept in memory and reset when the app reloads.
        </p>
      </form>
    </section>
  );
}

export default Login;