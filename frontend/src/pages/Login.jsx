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
        console.log(errorMessage);
        setErrors({ error: errorMessage });
      });
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div id="container">
        <div id="form-wrapper">
          <h1 className="text-2xl w-full text-center mb-10 font-bold">
            Login to your Paytm account
          </h1>

          <form onSubmit={(e) => handeleSubmit(e)} className="form">
            <label htmlFor="email">Enter your email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="form-inputs col-span-2"
              type="email"
              placeholder="Email"
            />
            <label htmlFor="password">Enter your password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="form-inputs col-span-2"
              type="password"
              placeholder="Password"
            />
            <button className="submit-button col-span-2" type="submit">
              Login
            </button>
            <p className="col-span-2 text-center text-base">
              Dont have an account?
              <span
                onClick={() => navigate("/register")}
                className="text-blue-500 cursor-pointer"
              >
                Register
              </span>
            </p>
            {Object.keys(errors).length > 0 ? (
              <div className="error-message">{errors.error}</div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
