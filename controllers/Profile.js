const User = require("../models/User");
const Profile = require("../models/Profile");

//! Update profile because profile fake data is already exist
exports.updateProfile = async (req, res) => {
  try {
    //get data
    const { gender, dob, about, contactNumber } = req.body;

    // get userId
    const userId = req.user.id;

    //validation
    if (!gender || !userId || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // Find the profile by id
    const userDetailes = await User.findById(userId);
    const profileId = userDetailes.additionalDetails;
    const profileDetailes = await Profile.findById(profileId);

    //update profile :- we have two way to create entry or update in db - 1:- create(), 2:- save() method
    profileDetailes.gender = gender;
    profileDetailes.dob = dob;
    profileDetailes.about = about;
    profileDetailes.contactNumber = contactNumber;
    // Save the updated profile
    await profileDetailes.save();

    //return response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profileDetailes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Profile Updation failed, something went wrong ",
      error: error.message,
    });
  }
};

//! delete profile

exports.deletedProfile = async (req, res) => {
  try {
    //* explore Cron Job for sheudiling to delete profile
    // const job = schedule.scheduleJob("10 * * * * *", function () {
    // 	console.log("The answer to life, the universe, and everything!");
    // });
    // console.log(job);

    // get id
    const userId = req.user.id;
    const userDetailes = await User.findById(userId);
    const profileId = userDetailes.additionalDetails;
    const courseId = userDetailes.courses;

    //validation
    if (!userDetailes) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    //delete profile,  user and course
    const deleteProfile = await Profile.findByIdAndDelete({ id: profileId });
    //TODO hw Unenroll user from all enrolled courses
    if (deleteProfile) {
      await courseId.findByIdAndDelete({ id: courseId });
    }

    await User.findByIdAndDelete({ id: userId });

    //return response
    return res.status(200).json({
      success: true,
      message: "Profile Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User can not be deleted successfully ",
      error: error.message,
    });
  }
};

//! get all user detailes
exports.getAllUserDetailes = async (req, res) => {
  try {
    //get profile id
    const userId = req.user.id;

    //validation and get user detailes
    const userDetailes = await User.findById(userId)
      .populate("additionalDetailes")
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "Profile details successfully ppopulated",
      userDetailes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User details not getting, something went wrong",
      error: error.message,
    });
  }
};
