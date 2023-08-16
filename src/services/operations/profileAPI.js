import { toast } from "react-hot-toast";

import { profileEndpoints } from "../apis";
import { setLoading } from "../..//slices/profileSlice";
import { apiConnector } from "../apiconnector";

const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;

export async function getEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    );

    console.log("GET_USER_ENROLLED_COURSES_API Resoonse-->>", response);

    toast.success("get User enrolled course successfully");

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("Could Not Get User enrolled course ERROR............", error);
    toast.error("Could Not Get User enrolled course");
  }

  setLoading(false);
  toast.dismiss(toastId);
}
