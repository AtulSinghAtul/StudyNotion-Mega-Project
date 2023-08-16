import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/iconBtn";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  function handleBuyCourse() {
    const courses = cart.map((course) => course._id);

    console.log("Bought these course:", courses);
    //! TODO: API integrate -> payment gateway tak leke jayegi
  }
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>

      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};

export default RenderTotalAmount;
