import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../probiders/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";
import Logout from "./Logout";

const Register = () => {
  const { user, error, loading, createNewAccount, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [internalError, setInternalError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const password2 = form.password2.value;

    if (password !== password2) {
      setInternalError("Your password did not match");
      return;
    }

    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      ) === false
    ) {
      setInternalError(
        "Your password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    setInternalError(null);

    const success = await createNewAccount(name, email, password);
    if (success) {
      form.reset();
      navigate("/order", { replace: true });
      form.reset();
    }
  };

  const googleLogin = async () => {
    const success = await signInWithGoogle();
    if (success) {
      navigate("/order", { replace: true });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (user) return <Logout />;

  return (
    <div className="login">
      <form onSubmit={handleSignUp}>
        <h2 className="title">Sign-Up</h2>
        <div className="form-control">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Type your name"
            required
          />
        </div>
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
        <div className="form-control">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm your password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {internalError && <p className="error">{internalError}</p>}
        <button type="submit" className="btn-submit">
          Sign-Up
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
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
};

export default Register;
