import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handeleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log(user);
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
