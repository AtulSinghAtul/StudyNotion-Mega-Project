import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

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
                <div className="w-[50px] h-[50px] bg-white flex items-center">
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
        <div></div>
      </div>
    </div>
  );
};

export default TimelineSection;
