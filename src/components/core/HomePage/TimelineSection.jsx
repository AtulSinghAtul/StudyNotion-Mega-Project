import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const TimelineSection = () => {
  const timeline = [
    {
      Logo: logo1,
      Heading: "Leadership",
      Description: "Fully committed tp the success company",
    },
    {
      Logo: logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];

  return (
    <div>
      <div className="flex flex-row gap-15 items-center justify-between">
        <div className="w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-6" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
                  <img src={element.Logo} alt="logo-1" />
                </div>

                <div>
                  <h2 className="text-semibold text-18px">{element.Heading}</h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* right img section */}
        <div className="relative shadow-blue-200">
          <img
            src={timelineImage}
            alt="timelineImage"
            className="shadow-black bg-cover h-fit"
          />

          <div className="absolute flex flex-row bg-caribbeangreen-700 text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex flex-row gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
