import React from "react";

const Tab = ({ tabData, accountType, setAccountType }) => {
  console.log(accountType);
  return (
    <div
      style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
      className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
    >
      {tabData.map((tab) => (
        <button
          onClick={() => setAccountType(tab.type)}
          className={` ${
            accountType === tab.type
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          }
          py-2 px-5 rounded-full transition-all duration-200`}
        >
          {console.log(accountType === tab.type)}
          {console.log(accountType)}
          <span key={tab.id}>{tab?.tabName}</span>
        </button>
      ))}
    </div>
  );
};

export default Tab;