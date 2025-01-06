import React, { useState } from "react";
import { UNSAFE_useFogOFWarDiscovery, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handeleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/login`, user)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setErrors({});
          navigate("/home");
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.errors?.[0]?.msg ||
          err.response?.data?.message ||
          "An error occurred during login";
        console.log(err);
        setErrors({ error: errorMessage });
      });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="container">
      <div className="form-header">
        <h2>
          Sign in to Paytm
          <p className="welcome-message text-sm">
            Welcome back! Please sign in to continue
          </p>
        </h2>
        <form onSubmit={handeleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>
          {Object.keys(errors).length > 0 ? (
            <div className="error-message">{errors.error}</div>
          ) : null}
        </form>
      </div>

      <div className="form-footer">
        <p>
          Don't have an account?{" "}
          <span
            className="link text-blue-600 font-bold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
