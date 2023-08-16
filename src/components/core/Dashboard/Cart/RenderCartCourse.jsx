import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";

const RenderCartCourse = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {cart.map((course, index) => (
          <div key={index}>
            <div>
              <img src={course?.thumbnail} alt="thumbnailImg" />
              <div>
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                <div>
                  <span>4.8</span>
                  <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<AiOutlineStar />}
                    fullIcon={<AiFillStar />}
                  />
                  <span>{course?.ratingAndReviews?.length} Ratings</span>
                </div>
              </div>
            </div>

            <div>
              <button onClick={() => dispatch(removeFromCart(course._id))}>
                <RiDeleteBinLine />
                <span>Remove</span>
              </button>

              <p>Rs {course?.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderCartCourse;
