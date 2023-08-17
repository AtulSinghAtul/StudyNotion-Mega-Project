import React, { useState } from "react";
import RenderSteps from "./RenderSteps";
console.log("entered into addcourse component 111");

const AddCourses = () => {
  const [change, setChange] = useState(null);
  console.log("entered into addcourse component 222");
  return (
    <div>
      <div>
        <RenderSteps />
        <form>
          <button onClick={() => setChange(change + 1)}></button>
          {change}
          {console.log(change)}
        </form>
        <div>
          <h2>⚡Course Upload Tips</h2>
          <ul>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>
              Make Announcements to notify any important Notes to all enrolled
              students at once.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCourses;
