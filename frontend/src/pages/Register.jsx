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
          "Could not register";
        console.log(err);
        setErrors({ error: errorMessage });
      });
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handeleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className="name-inputs">
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              required
            />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

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
          Sign Up
        </button>
      </form>

      <div className="form-footer">
        <p>
          Already have an account?{" "}
          <span
            className="link text-blue-600 font-bold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>

        {Object.keys(errors).length > 0 ? (
          <div className="error-message">{errors.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Register;

// import React from "react";
// import "./App.css";

// const Register = () => {
//     return (

//     );
// };

// export default Register;
