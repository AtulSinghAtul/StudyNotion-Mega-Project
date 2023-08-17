import React from "react";
import { useSelector } from "react-redux";

const MyCourses = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div>
      <h1>My Course</h1>
      <div>
        <p>courses</p>
        <div>
          <p>DURATION</p>
          <p>PRICE</p>
          <p>ACTIONS</p>
        </div>
      </div>

      <div>
        <div>
          <img src={user?.thumbnail} alt="thumbnail" />
          <div>
            <p>{user?.courses.courseName}</p>
            <p>{user?.courses.courseDescription}</p>
            <p>Created:{user?.courses.courseDescription}</p>
            <p>{user?.courses.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
