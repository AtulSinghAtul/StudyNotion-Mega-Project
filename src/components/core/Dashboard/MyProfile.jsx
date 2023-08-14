import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/iconBtn";
import { LuFileEdit } from "react-icons/lu";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  console.log(user?.additionalDetails?.about);

  return (
    <div className="text-white ">
      <h1>My Profile</h1>

      {/* section 1 */}
      <div>
        <div>
          <img
            src={user?.image}
            alt={`profile-${user?.firstName} `}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onClick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <LuFileEdit />
        </IconBtn>
      </div>

      {/* section 2 */}
      <div>
        <div>
          <p>About</p>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <LuFileEdit />
          </IconBtn>
        </div>

        <p>{user?.additionalDetails?.about ?? "Hey Babbar "}</p>
      </div>

      {/* section 2 */}
      <div>
        <div>
          <p>Personal Detaile</p>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <LuFileEdit />
          </IconBtn>
        </div>

        <div>
          <div>
            <p>First Name</p>
            <p>{user?.firstName}</p>
          </div>

          <div>
            <p>Last Name</p>
            <p>{user?.lastName}</p>
          </div>

          <div>
            <p>Email</p>
            <p>{user?.email}</p>
          </div>

          <div>
            <p>Gender</p>
            <p>{user?.additionalDetails?.gender ?? "add gender"}</p>
          </div>

          <div>
            <p>Phone Number</p>
            <p>
              {user?.additionalDetails?.contactNumber ?? "Add contact Number"}
            </p>
          </div>

          <div>
            <p>Date of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth ?? "Add date of birth"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;