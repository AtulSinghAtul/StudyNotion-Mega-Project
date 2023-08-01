import React from "react";
import signupPage from "../assets/Images/signup.webp";
import frame from "../assets/Images/frame.png";
import Navbar from "../components/common/Nav";

const Login = () => {
  return (
    <div className="h-screen   w-screen overflow-x-hidden">
      <Navbar />
      <div className=" w-11/12 h-[100%]  mx-auto my-20 flex flex-row gap-[8%] justify-center items-start ">
        <div className="text-white flex flex-col gap-5 w-[40%] ">
          <h2 className="text-[29px] font-semibold w-[70%]">
            Join the millions learning to code with StudyNotion for free
          </h2>
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

          <div className="flex flex-row justify-start items-center gap-[6%]">
            <label className="flex flex-col gap-3 text-richblack-50 w-[32%]">
              <div>
                First Name <span className="text-[#f73e3e]">*</span>
              </div>

              <input
                className="py-2 px-5 rounded bg-richblack-700 shadow-sm shadow-richblack-200 border-none outline-none"
                type="text"
                name="email"
                id="email-id"
                required
                placeholder="Enter first name"
              />
            </label>

            <label className="flex flex-col gap-3 text-richblack-50 w-[32%]">
              <div>
                Last Name <span className="text-[#f73e3e]">*</span>
              </div>

              <input
                className="py-2 px-5 rounded bg-richblack-700 shadow-sm shadow-richblack-200 border-none outline-none"
                type="text"
                name="email"
                id="email-id"
                required
                placeholder="Enter last name"
              />
            </label>
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

          <div className="flex flex-row justify-start items-center gap-[6%]">
            <label className=" flex flex-col gap-3 text-richblack-50 w-[15%] ">
              <div className="relative w-40">
                Phone Number <span className="text-[#f73e3e]">*</span>
              </div>

              <input
                className="py-2 px-5 rounded bg-richblack-700 shadow-sm shadow-richblack-200 border-none outline-none"
                id="phone"
                type="tel"
                name="phone"
                required
                placeholder="+91"
                disabled
              />
            </label>

            <label className="flex flex-col gap-3 text-richblack-50 w-[49%]">
              <div className="mt-6"></div>
              <input
                className="py-2 px-5 rounded bg-richblack-700 shadow-sm shadow-richblack-200 border-none outline-none"
                id="phone"
                type="tel"
                name="phone"
                required
                placeholder="Enter Phone Number"
              />
            </label>
          </div>

          <div className="flex flex-row justify-start items-center gap-[6%]">
            <label className="flex flex-col gap-3 text-richblack-50 w-[32%]">
              <div>
                Create Password <span className="text-[#f73e3e]">*</span>
              </div>

              <input
                className="py-2 px-5 rounded bg-richblack-700 shadow-sm shadow-richblack-200 border-none outline-none"
                type="text"
                name="email"
                id="email-id"
                required
                placeholder="Enter Password"
              />
            </label>

            <label className="flex flex-col gap-3 text-richblack-50 w-[32%]">
              <div>
                Confirm Password <span className="text-[#f73e3e]">*</span>
              </div>

              <input
                className="py-2 px-5 rounded bg-richblack-700 shadow-sm shadow-richblack-200 border-none outline-none"
                type="text"
                name="email"
                id="email-id"
                required
                placeholder="Enter Password"
              />
            </label>
          </div>

          <button className="bg-[#FFD60A] text-richblack-900 py-2  w-[70%] rounded shadow-sm shadow-[#fbe778] border-none outline-none mt-2 font-semibold">
            Create Account
          </button>
        </div>
        <div className="relative w-[40%] ">
          <img
            className="absolute top-[-8%] left-[-8%] "
            src={signupPage}
            alt="loginImg"
          />
          <img className="" src={frame} alt="loginImg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
