import React, { useState } from "react";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import { useDispatch } from "react-redux";

const Setting = () => {
  const dispatch = useDispatch();

  // const user = useSelector((state) => {
  //   console.log("useselector state-->", state);
  //   console.log("useselector state.profile-->", state.profile);
  //   console.log("useselector state.profile.user-->", state.profile.user);
  //   return state.profile.user;
  // });
  // console.log("user-->", user);
  // console.log(user?.additionalDetails?.about);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    additionalDetails: {
      dob: "",
      gender: "",
      contactNumber: "",
      about: "",
    },
  });

  const { firstName, lastName, additionalDetails } = formData;

  const { gender, dob, about, contactNumber } = additionalDetails;
  console.log(additionalDetails);

  function handleOnChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.taget.value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log("hello button clicked");

    console.log(formData);

    dispatch(updateProfile({ ...additionalDetails }));
    console.log(formData);
    localStorage.setItem();
  }

  return (
    <div className="flex flex-col gap-8  ">
      <p className="text-white">Profile Information</p>
      <form
        onSubmit={handleOnSubmit}
        className="text-white grid grid-cols-2 gap-4 items-center justify-center"
      >
        {/* first name input */}
        <label htmlFor="firstName">
          First Name
          <input
            required
            onChange={(event) => handleOnChange(event)}
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Enter first name"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        {/* last name input */}
        <label htmlFor="lastName">
          Last Name{" "}
          <input
            required
            onChange={(event) => handleOnChange(event)}
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Enter last name"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        {/* dob input */}
        <label htmlFor="dob">
          Date of Birth{" "}
          <input
            required
            id="dob"
            onChange={(event) => handleOnChange(event)}
            type="date"
            name="dob"
            value={dob}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        {/* gender input */}
        <label htmlFor="gender">
          Gender
          <select
            id="gender"
            name="gender"
            required
            onChange={(event) => handleOnChange(event)}
            value={gender}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          >
            <option>Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
          </select>
        </label>

        {/* contact number input */}
        <label htmlFor="phone">
          Contact Number{" "}
          <input
            onChange={(event) => handleOnChange(event)}
            required
            type="tel"
            id="phone"
            name="contactNumber"
            value={contactNumber}
            placeholder="Enter contact number"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        {/* about input */}
        <label htmlFor="about">
          About{" "}
          <textarea
            required
            onChange={(event) => handleOnChange(event)}
            name="about"
            value={about}
            rows={4}
            cols={30}
            placeholder="Write about yourself"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        <button className="bg-yellow-200 rounded-md py-2 text-richblack-900 font-semibold">
          Save
        </button>
      </form>
    </div>
  );
};

export default Setting;
