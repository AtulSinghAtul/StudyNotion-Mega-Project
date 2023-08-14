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
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
// import MyProfile from "./components/core/Dashboard/MyProfile";
import DashboardPage from "./pages/DashboardPage";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error";
import PrivateRoute from "./components/core/Auth/PrivateRoute";

const App = () => {
  return (
    <div className="w-screen min-h-screen  bg-richblack-900 flex flex-col justify-start items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
        </Route>

        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
