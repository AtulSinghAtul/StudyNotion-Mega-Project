import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";

export const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourse = async () => {
    try {
      const response = await getEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch course detailes");
    }
  };

  useEffect(() => {
    getEnrolledCourse();
  }, []);

  return (
    <div className="text-white">
      <div>
        <h1>Enrolled Courses</h1>
        <div>
          <p>All</p>
          <p>Pending</p>
          <p>Comppleted</p>
        </div>

        <div>
          {!enrolledCourses ? (
            <div>Loading...</div>
          ) : !enrolledCourses.length ? (
            <p>You have not enrolled in any course yet</p>
          ) : (
            <div>
              <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
              </div>
              {/* cards */}
              {enrolledCourses?.map((course, index) => (
                <div>
                  <div>
                    <img src={course.thumbnail} alt="thumbnailImg" />

                    <div>
                      <p>{course.courseName}</p>
                      <p>{course.courseDescription}</p>
                    </div>
                  </div>

                  <div>{course?.totalDuration}</div>

                  <div>
                    <p>Progress: {course.progressPercentage || 0} %</p>

                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
