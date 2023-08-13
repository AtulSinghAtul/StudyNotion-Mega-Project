import React from "react";

const DropFunction = ({ open, setOpen }) => {
  return <div className={`${open ? "block" : "hidden"}`}>DropFunction</div>;
};

export default DropFunction;
