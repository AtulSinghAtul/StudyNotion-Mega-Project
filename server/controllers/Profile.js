const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

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

exports.deletedProfileAccount = async (req, res) => {
  try {
    //* explore Cron Job for sheudiling to delete profile
    // const job = schedule.scheduleJob("10 * * * * *", function () {
    // 	console.log("The answer to life, the universe, and everything!");
    // });
    // console.log(job);

    // get id
    const userId = req.user.id;
    console.log("userId ------>>>", userId);
    const userDetailes = await User.findById(userId);
    console.log("userDetailes---->>", userDetailes);
    const profileId = userDetailes.additionalDetails;
    const courseId = userDetailes.courses;

    //validation
    if (!userDetailes) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    console.log("userId ----->>", userId);

    //delete profile,  user and course
    const deleteProfile = await Profile.findByIdAndDelete({ _id: profileId });
    console.log("delete courseId 0 ----->>", deleteProfile);
    //TODO hw Unenroll user from all enrolled courses
    if (deleteProfile) {
      console.log("delete courseId 1 ----->>", courseId);
      await Course.findByIdAndDelete({ _id: courseId });
      console.log("delete courseId 2 ----->>", courseId);
    }
    console.log("delete courseId 3 ----->>", courseId);

    await User.findByIdAndDelete({ _id: userId });
    console.log("delete userId  4 ----->>", userId);
    //return response
    return res.status(200).json({
      success: true,
      message: "Profile Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User can not be deleted successfully ",
      error: error.message,
    });
  }
};

//! get all user detailes
exports.getAllUserDetails = async (req, res) => {
  try {
    //get profile id
    const userId = req.user.id;

    //validation and get user detailes
    const userDetailes = await User.findById(userId)
      .populate("additionalDetails")
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

//! added this below code from lecture - 6
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    console.log(`uploadImageToCloudinary display 1`);
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(`uploadImageToCloudinary display 2`);
    console.log("profile image-->>", image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Image not uploaded on cloudinary",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
