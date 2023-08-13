import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Qutote = () => {
  return (
    <div>
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HighlightText text={"combines technology"} />,{" "}
      <span className="text-brown-400">expertise</span>, and community to create
      an
      <span className="text-brown-400">
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  );
};

export default Qutote;
