import React from "react";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <button>Dashboard</button>
      <button onClick={() => dispatch(logout(navigate))}>Logout</button>
    </div>
  );
};

export default ProfileDropDown;
