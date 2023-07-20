import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20 items-center justify-center">
        <div className="w-[50%]">
          <img
            src={Instructor}
            alt="InstructorImage"
            className="shadow-white"
          />
        </div>

        <div className="flex flex-col w-[50%] gap-10">
          <div className="text-4xl font-semibold w-[50%]">
            Become an <HighlightText text={"instructor"} />
          </div>
          <p className="text-[16px] font-medium w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="flex items-start">
            <CTAButton active={true} linkto={"./signup"}>
              <div className="flex flex-row justify-center items-center gap-2 text-center">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
