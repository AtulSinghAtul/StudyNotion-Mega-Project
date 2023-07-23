import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career Paths",
];
const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => {
      return course.tag === value;
    });

    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className=" relative flex flex-col justify-center items-center gap-8 mb-[280px]">
      <div className="text-4xl font-semibold text-center">
        Unlock the <HighlightText text={"Power of Code"} />
      </div>
      <p className="text-richblack-300 text-center text-[16px]  ">
        Learn to Build Anything You Can Imagine
      </p>

      <div className="flex flex-row items-center justify-center gap-12 bg-richblack-700 px-1 py-1 mb-5 rounded-full border-richblack-100">
        {tabName.map((element, index) => {
          return (
            <div
              onClick={setMyCards}
              key={index}
              className={`${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium "
                  : "text-richblack-200"
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 flex flex-row items-center justify-center`}
            >
              {element}
            </div>
          );
        })}
      </div>

      {/* course card ka group */}
      <div className="absolute top-[140%] flex flex-row gap-10 justify-between w-full">
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
