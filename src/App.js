import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Nav";
import OpenRoute from "./components/core/Auth/OpenRoute";

const App = () => {
  return (
    <div className="w-screen min-h-screen  bg-richblack-900 flex flex-col justify-center items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
