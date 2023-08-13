import React from "react";
import HighlightText from "../core/HomePage/HighlightText";
import CTAButton from "../core/HomePage/Button";

const LearnGridArray = [
  {
    order: -1,
    heading: `World-Class Learning for`,
    highlightText: `Anyone, Anywhere`,

    description: `Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.`,

    BtnText: `Learn More`,
    BtnLink: `/`,
  },
  {
    order: 1,
    heading: `Curriculum Based on Industry Needs`,
    description: `Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.`,
  },
  {
    order: 2,
    heading: `Our Learning Methods`,
    description: `The learning process uses the namely online and offline.`,
  },
  {
    order: 3,
    heading: `Certification`,
    description: `You will get a certificate that can be used as a certification during job hunting.`,
  },
  {
    order: 4,
    heading: `Rating 
    "Auto-grading"`,
    description: `You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.`,
  },
  {
    order: 5,
    heading: `Ready to
    Work`,
    description: `Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.`,
  },
];

const LearningGrid = () => {
  return (
    <section>
      <div className="grid  grid-cols-1 lg:grid-cols-4 grid-rows-2 gap-4 my-20 ">
        {LearnGridArray.map((card, index) => (
          <div
            key={index}
            className={`h-[300px] p-5  ${index === 0 && "lg:col-span-2 "} ${
              card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"
            } ${card.order === 3 && "lg:col-start-2"}
            ${card.order < 0 && "bg-transparent"}
            `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col  gap-3 ">
                {" "}
                <header className="text-4xl font-semibold">
                  {card.heading}{" "}
                  <HighlightText text={`${card.highlightText}`} />
                </header>
                <p className="font-medium">{card.description}</p>
                <div className="w-[30%]">
                  <CTAButton
                    active={true}
                    linkto={card.BtnLink}
                  >{`${card.BtnText}`}</CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8 ">
                <heading className="text-richblack-5 text-lg">{`${card.heading}`}</heading>
                <p className="text-richblack-400">{`${card.description}`}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningGrid;
