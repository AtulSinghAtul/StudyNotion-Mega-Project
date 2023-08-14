import React from "react";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DropFunction = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(open);
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } flex flex-col gap-1 absolute top-8 right-1`}
    >
      <div onClick={() => setOpen(false)}>DropFunction</div>

      <button onClick={() => dispatch(logout(navigate))}>Logout</button>
    </div>
  );
};

export default DropFunction;
