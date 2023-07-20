import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Banner from "../assets/Images/banner.mp4";
import TimeLineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";

const Home = () => {
  return (
    <>
      <div>
        {/* section 1 */}
        <div className="relative mx-auto w-11/12 max-w-maxContent flex flex-col justify-between items-center text-white ">
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
          <div className="w-[83%] text-center text-md font-semibold text-richblack-300 mt-4">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors. Learn More Book a Demo
          </div>

          <div className="flex flex-row justify-center gap-7 mt-8 ">
            {/* shadow par kam karna hai */}
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>

          <div className="mx-3 my-20  video-background-shadow  h-fit ">
            {/* left/top- blueshadow, right/bottom- white shadow */}

            <video muted loop autoplay className="video-shadow ">
              <source src={Banner} type="video/mp4" />
            </video>
          </div>

          {/* code section 1 */}
          <div className="w-[100%] ">
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className="text-4xl font-semibold w-[95%]">
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
              codeblock={`<!DOCTYPE html className='text-red'>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</ahref=>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n <ahref="three/">Three</a>\n/nav>     
`}
              codeColor={"text-yellow-50"}
            />
          </div>

          {/* code section 2 */}
          <div className="w-[100%]  ">
            <CodeBlocks
              position={"flex-row-reverse"}
              heading={
                <div className="text-4xl font-semibold w-[40%]">
                  Start{" "}
                  <HighlightText
                    text="coding 
in seconds"
                  />
                </div>
              }
              subheading={` 
Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
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
              codeblock={`<!DOCTYPE html className='text-red'>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</ahref=>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n <ahref="three/">Three</a>\n/nav>      
`}
              codeColor={"text-yellow-50"}
            />
          </div>
        </div>

        {/* section 2 */}
        <div className="bg-pure-greys-5 text-richblack-700 w-screen">
          <div className="homepage_bg h-[310px]">
            <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto">
              <div className="flex flex-row justify-center items-center gap-7 w-[100%] h-[310px] text-white">
                <CTAButton active={true} linkto={"/signup"}>
                  <div className="flex flex-row justify-center items-center gap-3">
                    Explore Full Catalog
                    <FaArrowRight />
                  </div>
                </CTAButton>

                <CTAButton active={false} linkto={"/signup"}>
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="mx-auto w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-7">
            <div className="flex flex-row gap-5 mb-10 mt-[95px]">
              <div className="text-4xl font-semibold w-[45%]">
                Get the skills you need for a
                <HighlightText text={"job that is in demand."} />
              </div>

              <div className="flex flex-col items-start gap-10 w-[40%] ">
                <div className="text-16px">
                  The modern StudyNotion is the dictates its own terms. Today,
                  to be a competitive specialist requires more than professional
                  skills.
                </div>

                <CTAButton active={true} linkto={"/signup"}>
                  <div>Learn More</div>
                </CTAButton>
              </div>
            </div>

            <TimeLineSection />

            <LearningLanguageSection />
          </div>
        </div>

        {/* section 3 */}

        <div
          className="flex flex-col items-center justify-between gap-8 w-11/12 max-w-maxContent mx-auto 
         bg-richblack-900 text-white first-letter"
        >
          <InstructorSection />

          <h2 className="text-center text-4xl font-semibold mt-20">
            Reviews from other learners
          </h2>
          {/* make review slider here*/}
        </div>

        {/* section 4 -> footer */}
      </div>
    </>
  );
};

export default Home;
