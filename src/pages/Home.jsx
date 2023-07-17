import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Banner from "../assets/Images/banner.mp4";

const Home = () => {
  return (
    <>
      <div>
        {/* section 1 */}
        <div className="relative mx-auto w-12/12 max-w-maxContent flex flex-col justify-center items-center text-white ">
          <Link to="/signup">
            <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
              <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[px] transition-all duration-200 group-hover:bg-richblack-900">
                <p>Become an Instructor</p>
                {/* border aur shadow par kam karna hai */}
                <FaArrowRight />
              </div>
            </div>
          </Link>

          <div className="text-center text-4xl font-semibold mt-6">
            Empower Your Future with <HighlightText text={"Coding Skills"} />
            {/*  gradient par kam karna hai */}
          </div>
          <div className="w-[85%] text-center text-lg font-bold text-richblack-300">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors. Learn More Book a Demo
          </div>

          <div className="flex flex-row justify-center gap-7 mt-8">
            {/* shadow par kam karna hai */}
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>

          <div className="mx-3 my-12 shadow-blue-200 ">
            {/* left/top- blueshadow, right/bottom- white shadow */}
            <video muted loop autoplay>
              <source src={Banner} type="video/mp4" />
            </video>
          </div>

          {/* code section 1 */}
          <div className="">
            <CodeBlocks
              heading={
                <div className="text-4xl font-semibold">
                  Unlock your <HighlightText text="coding potential" /> with our
                  online courses.
                </div>
              }
              subheading={` Our courses are designed and taught by industry experts who
                  have years of experience in coding and are passionate about
                  sharing their knowledge with you.`}
              ctabtn1={{
                active: true,
                linkto: "/signup",
                btnText: "Try it Yourself",
              }}
              ctabtn2={{
                active: false,
                linkto: "/login",
                btnText: "Learn More",
              }}
              codeblock={`<!DOCTYPE html>\n
<html>\n
head><title>Example</title>\n
<linkrel="stylesheet"href="styles.css">\n
/head>\n
body>\n
h1><ahref="/">Header</a>\n
/h1>\n
nav><ahref="one/">One</a><ahref="two/">Two</a>\n <ahref="three/">Three</a>/n
/nav>`}
              codeColor={"text-yellow-50"}
            />
          </div>
        </div>

        {/* section 2 */}
        {/* section 3 */}
        {/* section 4 -> footer */}
      </div>
    </>
  );
};

export default Home;
