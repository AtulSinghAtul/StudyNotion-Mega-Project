// import React, { useState } from "react";
// import { updateProfile } from "../../../../services/operations/settingsAPI";
// import { useDispatch, useSelector } from "react-redux";

// const Setting = () => {
//   const dispatch = useDispatch();

//   const user = useSelector((state) => {
//     console.log("useselector state-->", state);
//     console.log("useselector state.profile-->", state.profile);
//     console.log("useselector state.profile.user-->", state.profile.user);
//     return state.profile.user;
//   });
//   console.log("user-->", user);
//   console.log(user?.additionalDetails?.about);

//   const { token } = useSelector((state) => state.auth);

//   // const [formData, setFormData] = useState({
//   //   firstName: "",
//   //   lastName: "",
//   //   additionalDetails: {
//   //     dob: "",
//   //     gender: "",
//   //     contactNumber: "",
//   //     about: "",
//   //   },
//   // });

//   // const { firstName, lastName, additionalDetails } = formData;

//   // const { gender, dob, about, contactNumber } = additionalDetails;
//   // console.log(additionalDetails);

//   // function handleOnChange(event) {
//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     [event.target.name]: event.taget.value,
//   //   }));
//   // }

//   function handleOnSubmit(data) {
//     console.log(data);
//     data.preventDefault();
//     console.log("hello button clicked");

//     // console.log(formData);

//     dispatch(updateProfile(token, data));
//     // console.log(formData);
//     // localStorage.setItem();
//   }

//   return (
//     <div className="flex flex-col gap-8  ">
//       <p className="text-white">Profile Information</p>
//       <form
//         onSubmit={handleOnSubmit}
//         className="text-white grid grid-cols-2 gap-4 items-center justify-center"
//       >
//         {/* first name input */}
//         <label htmlFor="firstName">
//           First Name
//           <input
//             required
//             // onChange={handleOnChange}
//             type="text"
//             name="firstName"
//             value={user?.firstName}
//             placeholder="Enter first name"
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//             className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//           />
//         </label>

//         {/* last name input */}
//         <label htmlFor="lastName">
//           Last Name{" "}
//           <input
//             required
//             // onChange={handleOnChange}
//             type="text"
//             name="lastName"
//             value={user?.lastName}
//             placeholder="Enter last name"
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//             className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//           />
//         </label>

//         {/* dob input */}
//         <label htmlFor="dob">
//           Date of Birth{" "}
//           <input
//             required
//             id="dob"
//             // onChange={handleOnChange}
//             type="date"
//             name="dob"
//             value={user?.dob}
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//             className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//           />
//         </label>

//         {/* gender input */}
//         <label htmlFor="gender">
//           Gender
//           <select
//             id="gender"
//             name="gender"
//             required
//             // onChange={handleOnChange}
//             value={user?.gender}
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//             className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//           >
//             <option>Select</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Transgender">Transgender</option>
//           </select>
//         </label>

//         {/* contact number input */}
//         <label htmlFor="phone">
//           Contact Number{" "}
//           <input
//             // onChange={handleOnChange}
//             required
//             type="tel"
//             id="phone"
//             name="contactNumber"
//             value={user?.contactNumber}
//             placeholder="Enter contact number"
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//             className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//           />
//         </label>

//         {/* about input */}
//         <label htmlFor="about">
//           About{" "}
//           <textarea
//             required
//             // onChange={handleOnChange}
//             name="about"
//             value={user?.about}
//             rows={4}
//             cols={30}
//             placeholder="Write about yourself"
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//             className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//           />
//         </label>

//         <button className="bg-yellow-200 rounded-md py-2 text-richblack-900 font-semibold">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Setting;

// /////////////////////////////////////////////////////

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/iconBtn";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    console.log("Form Data - ", data);
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <div className="bg-white">
            <IconBtn type="submit" text="Save" />
          </div>
        </div>
      </form>
    </>
  );
}
