import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../probiders/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";
import "./Login.css";
import Logout from "./Logout";

export default function Login() {
  const { user, loading, error, signInWithCredential, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();

  const loginHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const success = await signInWithCredential(email, password);
    if (success) {
      if (location.state) {
        navigate(location.state, {
          replace: true,
        });
      } else navigate("/order", { replace: true });
    }

    form.reset();
  };

  const googleLogin = async () => {
    const success = await signInWithGoogle();
    if (success) {
      if (location.state) navigate(location.state, { replace: true });
      else navigate("/order", { replace: true });
    }
  };

  if (loading) return <LoadingSpinner />;

  if (user) return <Logout />;

  return (
    <div className="login" data-aos="zoom-in" data-aos-duration="1000">
      {location.state && (
        <p
          className="error"
          style={{ margin: "1rem auto 2rem", textAlign: "center" }}
        >
          Please login first
        </p>
      )}
      <form onSubmit={loginHandler}>
        <h2 className="title">Login</h2>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Type your email"
            required
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Type your password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-submit">
          Login
        </button>
        <p>
          New to Ema-john? <Link to="/register">Create New Account</Link>
        </p>
        <div className="devider">
          <span></span>
          or
          <span></span>
        </div>
        <button onClick={googleLogin} type="button" className="btn-google">
          Continue with Google
        </button>
      </form>
    </div>
  );
}
