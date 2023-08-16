import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { RiLogoutCircleRLine } from "react-icons/ri";
import CofirmationModal from "../../common/CofirmationModal";

const Sidebar = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <div className="mt-10">Loading...</div>;
  }

  return (
    <div className="text-richblack-300">
      <div className="flex flex-col border-r-richblack-700 h-[calc(100vh-3.5rem)] w-[222px] bg-richblack-800 py-10 ">
        <div className="flex flex-col ml-4">
          {sidebarLinks.map((link, index) => (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          ))}
        </div>

        {/* horizontal line */}
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

        {/* sttings */}
        <SidebarLink link={{ name: "Settings", path: "dashboard/settings" }} />

        {/* logout button */}

        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are You Sure ?",
              text2: "You will be logged out of your Account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
        >
          <div className="flex items-center gap-x-2">
            <RiLogoutCircleRLine className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>

      {confirmationModal && <CofirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
