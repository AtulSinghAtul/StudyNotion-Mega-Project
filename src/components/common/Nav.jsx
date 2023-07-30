import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, useLocation, matchPath } from "react-router-dom";
import NavbarLinks from "../../data/navbar-links";

const Nav = () => {
  const location = useLocation();

  function matchRoute(route) {
    console.log(location.pathname);
    console.log(matchPath({ path: route }, location.pathname));
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 text-white">
      {/* logo image */}
      <div className="flex flex-row justify-between items-center w-11/12 max-w-maxContent">
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
                  <div></div>
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
      <div className="flex gap-x-4 items-center"></div>
    </div>
  );
};

export default Nav;
