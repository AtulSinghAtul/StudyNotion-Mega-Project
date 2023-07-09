const Tag = require("../models/Tags");
const User = require("../models/User");
const Course = require("../models/Course");
const uploadImageToCloudinary = require("../utils/imageUploader");

// create course handler function
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;
    // get thumbnail
    const thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: true,
        message: "All fields are required",
      });
    }

    // check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details ->>", instructorDetails);
    //TODO: verify that userId and instructorDetails._id is same or different

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    // check given tag is valid or not
    const tagDetail = await Tag.findById(tag);
    if (!tagDetail) {
      return res.status(404).json({
        success: false,
        message: "Tag details not found",
      });
    }

    // upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create an entry for new course in db

    const newCourse = Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      instructor: instructorDetails,
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      tag: tagDetail,
      thumbnail: thumbnailImage.secure_url,
    });

    // add the new course to the user schema of Instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // add course entry in tag schema
    // TODO H/W

    await Tag.findByIdAndUpdate(
      { _id: tagDetail._id },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Failed to create course",
      error: error.message,
    });
  }
};

// getAllCourses Handler Function
exports.showAllCourses = async (req, res) => {
  try {
    // TODO: change the below statement incrementally
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch course data",
      error: error.message,
    });
  }
};
