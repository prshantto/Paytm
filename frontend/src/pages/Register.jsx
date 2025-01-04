import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handeleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstname,
      lastname,
      email,
      password,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/register`, user)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/login");
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
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div id="container">
        <div id="form-wrapper">
          <h1 className="text-2xl w-full text-center mb-10 font-bold">
            Register your Paytm account
          </h1>

          <form onSubmit={(e) => handeleSubmit(e)} className="form">
            <label htmlFor="name">Enter your name:</label>
            <div id="name" className="col-span-2 flex justify-between">
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="form-inputs"
                type="text"
                placeholder="Firstname"
              />
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="form-inputs"
                type="text"
                placeholder="Lastname"
              />
            </div>
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
              Register
            </button>
            <p className="col-span-2 text-center text-base">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </p>
            {Object.keys(errors).length > 0 ? (
              <div className="error-message">{errors.error}</div>
            ) : null}
          </form>
        </div>{" "}
      </div>
    </>
  );
};

export default Register;
