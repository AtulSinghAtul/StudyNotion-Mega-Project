// import { settingsEndpoints } from "../apis";
// import { toast } from "react-hot-toast";
// import { apiConnector } from "../apiconnector";
// // import { useDispatch } from "react-redux";
// import { setLoading } from "../../slices/profileSlice";

// const {
//   UPDATE_DISPLAY_PICTURE_API,
//   UPDATE_PROFILE_API,
//   // CHANGE_PASSWORD_API,
//   // DELETE_PROFILE_API,
// } = settingsEndpoints;

// // export function updateDisplayPicture(displayPicture, userId) {
// //   return async (dispatch) => {
// //     const toastId = toast.loading("Loading...");
// //     setLoading(true);
// //     try {
// //       const response = await apiConnector(POST, UPDATE_DISPLAY_PICTURE_API, {
// //         displayPicture,
// //         userId,
// //       });
// //     } catch (error) {}
// //   };
// // }

// export function updateProfile(token, formData) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...");

//     console.log("UPDATE_DISPLAY_PICTURE_API--", UPDATE_DISPLAY_PICTURE_API);
//     try {
//       console.log("Before UPDATE_PROFILE_API");
//       console.log("UPDATE_PROFILE_API--", UPDATE_PROFILE_API);
//       const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
//         Authorization: `Bearer ${token}`,
//       });
//       console.log("After UPDATE_PROFILE_API");
//       console.log("SENDOTP API RESPONSE............", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Profile Updated Successfully");
//     } catch (error) {
//       console.log("Update Profile API ERROR............", error);
//       toast.error("Could Not Update Profile");
//     }
//     dispatch(setLoading(false));
//     toast.dismiss(toastId);
//   };
// }

////////////////////////////////////////////////////////

import { toast } from "react-hot-toast";

import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      );
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}
