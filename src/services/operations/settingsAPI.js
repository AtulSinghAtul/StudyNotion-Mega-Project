import { settingsEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
// import { useDispatch } from "react-redux";
import { setLoading } from "../../slices/profileSlice";

const {
  // UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  // CHANGE_PASSWORD_API,
  // DELETE_PROFILE_API,
} = settingsEndpoints;

// export function updateDisplayPicture(displayPicture, userId) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...");
//     setLoading(true);
//     try {
//       const response = await apiConnector(POST, UPDATE_DISPLAY_PICTURE_API, {
//         displayPicture,
//         userId,
//       });
//     } catch (error) {}
//   };
// }

export function updateProfile(gender, dob, about, contactNumber) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
        gender,
        dob,
        about,
        contactNumber,
      });
      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Update Profile API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
