import React from "react";
import loginPage from "../assets/Images/login.webp";
import frame from "../assets/Images/frame.png";
import Navbar from "../components/common/Nav";

const Login = () => {
  return (
    <div className="h-screen   w-screen overflow-hidden">
      <Navbar />
      <div className=" w-11/12 h-[100%]  mx-auto flex flex-row gap-[8%] justify-center items-center ">
        <div className="text-white flex flex-col gap-5 w-[40%] ">
          <h2 className="text-[32px] font-semibold">Welcome Back</h2>
          <p className="text-base text-richblack-100 w-[390px]">
            Build skills for today, tomorrow, and beyond. Education to
            future-proof your career.
          </p>

          <div className="flex flex-row gap-8 bg-richblack-700 w-fit my-3 py-1 px-1 rounded-full shadow-sm shadow-richblack-200 border-none outline-none">
            <button className="hover:bg-richblack-900 text-richblack-50 hover:text-richblack-5 px-5 py-2  rounded-full">
              Student
            </button>
            <button className="hover:bg-richblack-900 hover:text-richblack-5 text-richblack-50 px-5 py-2 rounded-full">
              Instructors
            </button>
          </div>

          <label className="flex flex-col gap-3 text-richblack-50 w-[70%]">
            <div>
              Email Address <span className="text-[#f73e3e]">*</span>
            </div>

            <input
              className="py-2 px-5 rounded bg-richblack-700 shadow-sm shadow-richblack-200 border-none outline-none"
              type="text"
              name="email"
              id="email-id"
              required
              placeholder="Enter email address"
            />
          </label>

          <label className="flex flex-col gap-3 text-richblack-50 w-[70%]">
            <div>
              Password <span className="text-[#f73e3e]">*</span>
            </div>

            <input
              className="py-2 px-5 rounded bg-richblack-700 shadow-sm shadow-richblack-200 border-none outline-none"
              type="text"
              name="email"
              id="email-id"
              required
              placeholder="Enter Password"
            />
            <span className="relative left-[78%] text-[12px] text-blue-400">
              Forgot password
            </span>
          </label>

          <button className="bg-[#FFD60A] text-richblack-900 py-2  w-[70%] rounded shadow-sm shadow-[#fbe778] border-none outline-none mt-2 font-semibold">
            Sign in
          </button>
        </div>
        <div className="relative w-[40%] ">
          <img
            className="absolute top-[-8%] left-[-8%] "
            src={loginPage}
            alt="loginImg"
          />
          <img className="" src={frame} alt="loginImg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
