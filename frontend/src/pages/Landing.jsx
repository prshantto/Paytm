import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Hi there! welcome to paytm</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
};

export default Landing;
