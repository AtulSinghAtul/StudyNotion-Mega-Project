import { useSelector } from "react-redux";
import RenderCartCourse from "../Cart/RenderCartCourse";
import RenderTotalAmount from "../Cart/RenderCartCourse";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);
  return (
    <div className="text-white">
      <h1>Your Cart</h1>
      <p>{totalItems}</p>

      {total > 0 ? (
        <div>
          <RenderCartCourse />
          <RenderTotalAmount />
        </div>
      ) : (
        <p>Your Cart is Empty</p>
      )}
    </div>
  );
}
