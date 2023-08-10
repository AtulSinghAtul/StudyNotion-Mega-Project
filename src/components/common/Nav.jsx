import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, useLocation, matchPath } from "react-router-dom";
import NavbarLinks from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidChevronDown } from "react-icons/bi";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
// import { useState, useEffect } from "react";
// import { categories } from "../../services/apis";
// import { apiConnector } from "../../services/apiconnector";

const subLinks = [
  {
    title: "Python",
    link: "/python",
  },
  {
    title: "Web Dev",
    link: "/web-development",
  },
];

const Nav = () => {
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  // const [subLinks, setSubLinks] = useState([]);

  // const fetchSubLinks = async () => {
  //   try {
  //     const result = await apiConnector("GET", categories.CATEGORIES_API);
  //     console.log("Printing Sublinks result:", result);
  //     setSubLinks(result.data.data);
  //   } catch (error) {
  //     console.log(error.message);
  //     console.log("Could not fetch the category list");
  //   }
  // };

  // useEffect(() => {
  //   fetchSubLinks();
  // }, []);

  function matchRoute(route) {
    // console.log(location.pathname);
    // console.log(matchPath({ path: route }, location.pathname));
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div className="flex w-[100%] justify-center items-center h-14 border-b-[1px] border-b-richblack-700 ">
      <div
        className="flex  items-center justify-between  text-white 
       w-11/12 max-w-maxContent "
      >
        {/* logo image */}
        <div className="flex flex-row justify-between items-center ">
          <Link to="/">
            <img src={Logo} width={160} height={42} loading="lazy" alt="img" />
          </Link>
        </div>

        {/* nav link */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks?.map((links, index) => {
              return (
                <li key={index} className="text-yellow-25">
                  {links.title === "Catalog" ? (
                    <div className="relative">
                      <div
                        className={`   flex items-center gap-1 hover:cursor-pointer group`}
                      >
                        {links.title}
                        <BiSolidChevronDown />

                        {/* hover dropdown box */}
                        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[28%] bg-richblack-5 rounded-md md:w-[320px] h-fit px-2 py-5 invisible group-hover:visible z-10 ">
                          <div className="absolute left-[59%] top-[50%] translate-x-[-50%] translate-y-[-239.5%] bg-richblack-5 w-8 h-8  -rotate-45 "></div>

                          {subLinks.length ? (
                            subLinks.map((subLink, index) => (
                              <Link to={subLink.link}>
                                <div
                                  key={index}
                                  className={` flex flex-col mb-2 w-[100%] py-1 px-1 rounded-md text-richblack-25  bg-richblack-300 hover:bg-richblack-700 hover:text-richblack-25`}
                                >
                                  {subLink.title}
                                </div>
                              </Link>
                            ))
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to={links?.path}>
                      <p
                        className={`${
                          matchRoute(links?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {links?.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="border-1px border-richblack-700 bg-richblack-800 px-6 py-2 rounded text-richblack-100">
                {console.log("Nav bar login")}
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="border-1px border-richblack-700 bg-richblack-800 px-6 py-2 rounded text-richblack-100">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Nav;
