import React from "react";
import UpdateProfile from "./UpdateProfile";
import ChangeProfilePicture from "./ChangeProfilePicture";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const index = () => {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <UpdateProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  );
};

export default index;
