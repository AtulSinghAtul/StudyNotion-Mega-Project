import React from "react";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  console.log(currentCard);
  return (
    // <div className="relative">
    <div
      className={` ${
        currentCard === "Learn HTML" ? "bg-richblack-700 " : "bg-richblack-100"
      } flex flex-col items-start justify-between gap-2 w-[33%] py-5`}
    >
      <div className="font-semibold text-lg text-white px-5 mb-3">
        {cardData.heading}
      </div>
      <p className="text-richblack-300 text-[14px] pb-10 px-5">
        {cardData.description}
      </p>
      <div className="w-[100%] h-[1px] bg-richblack-500 border-dotted"></div>

      <div className="flex flex-row items-start justify-between gap-2 px-5 w-[100%] text-[14px] text-richblack-300">
        <p>{cardData.level}</p>
        <p>{cardData.lessionNumber} Lessons</p>
      </div>
    </div>
    // </div>
  );
};

export default CourseCard;
