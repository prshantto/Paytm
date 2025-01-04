import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
