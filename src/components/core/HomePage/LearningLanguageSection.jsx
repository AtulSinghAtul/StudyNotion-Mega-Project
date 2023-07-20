import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className="mt-32 pb-20">
      <div className="flex flex-col  items-center justify-center ">
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-4xl font-semibold text-center">
            Your swiss knife for
            <HighlightText text={`learning any language`} />
          </p>
          <p className="text-center w-[70%] mt-2 mx-auto text-base text-richblack-600 ">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <img
            src={know_your_progress}
            alt="Know_your_progress.svg"
            className="object-contain "
          />

          <img
            src={compare_with_others}
            alt="compare_with_others.svg"
            className="object-contain -ml-32 mt-[58px]"
          />

          <img
            src={plan_your_lesson}
            alt="plan_your_lesson.svg"
            className="object-contain -ml-32"
          />
        </div>

        <div>
          <CTAButton children={"Learn More"} active={true} linkto={"/signup"} />
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
