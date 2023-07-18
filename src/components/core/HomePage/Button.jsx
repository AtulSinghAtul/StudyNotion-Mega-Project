import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-8 py-3 rounded-md font-bold hover:scale transition-all duration-200 ${
          active
            ? "bg-yellow-50 text-black btn-yellow-shadow "
            : "bg-richblack-800 text-white btn-black-shadow"
        } `}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
