import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="w-screen min-h-screen  bg-richblack-900 flex flex-col justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
