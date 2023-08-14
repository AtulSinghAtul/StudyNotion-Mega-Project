import React from "react";
import IconBtn from "./iconBtn";

const CofirmationModal = ({ modalData }) => {
  return (
    <div>
      <div className="flex flex-col gap-y-3">
        <h1>{modalData.text1}</h1>
        <p>{modalData.text2}</p>

        <div className="flex gap-x-3">
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />

          <button onClick={modalData?.btn2Handler}>
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CofirmationModal;
