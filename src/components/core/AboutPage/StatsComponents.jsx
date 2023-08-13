import React from "react";

const Stats = [
  { count: "5K", label: "Active Stidents" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponents = () => {
  return (
    <section>
      <div className="flex gap-5">
        {Stats.map((data, index) => (
          <data
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <h1>{data.count}</h1>
            <h2>{data.label}</h2>
          </data>
        ))}
      </div>
    </section>
  );
};

export default StatsComponents;
