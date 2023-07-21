import React from "react";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={` ${
        currentCard === "Learn HTML" ? "bg-richblack-700 " : "bg-richblack-100"
      } flex flex-col items-start justify-between gap-2 w-[22%] py-5`}
    >
      <div className="font-semibold text-white px-5 "> {cardData.heading}</div>
      <p className="text-richblack-300 text-[14px] pb-8 px-5">
        {cardData.description}
      </p>
      <div className="w-[100%] h-[30px] bg-richblack-500 border-dotted"></div>

      <div className="flex flex-row items-start justify-between gap-2 px-5 w-[100%] text-[14px] text-richblack-300">
        <p>{cardData.level}</p>
        <p>{cardData.lessionNumber} Lessons</p>
      </div>
    </div>
  );
};

export default CourseCard;
