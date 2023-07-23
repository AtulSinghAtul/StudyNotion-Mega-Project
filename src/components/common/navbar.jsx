import React from "react";
import studyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" px-20 py-3 bg-[#161D29]">
      <div className="flex flex-row justify-between items-center    w-11/12 mx-auto text-[15px] text-richblack-200">
        <img
          src={studyNotionLogo}
          alt="studynotionimg"
          className="w-[180px] cursor-pointer"
        />
        <ul className="flex flex-row justify-center items-center gap-5 ">
          <li className="cursor-pointer hover:text-[#FFD60A]">Home</li>
          <li className="flex flex-row justify-center items-baseline cursor-pointer">
            <span className="text-[#FFD60A] hover:text-[#FFD60A] ">
              Catalog
            </span>
            <RiArrowDropDownLine />
          </li>
          <li className="cursor-pointer hover:text-[#FFD60A]">About us</li>
          <li className="cursor-pointer hover:text-[#FFD60A]">Contact us</li>
        </ul>

        <div className="flex flex-row justify-center items-center gap-4">
          <div className="cursor-pointer">
            <BsSearch />
          </div>
          <div className="cursor-pointer">
            <AiOutlineShoppingCart />
          </div>
          <Link to={"/login"}>
            <p className="cursor-pointer hover:text-[#FFD60A]">Login</p>
          </Link>
          <Link to={"/signup"}>
            <p className="cursor-pointer hover:text-[#FFD60A]">Sign up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
