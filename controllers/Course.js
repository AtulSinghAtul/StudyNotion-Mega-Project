const Category = require("../models/Category");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create course handler function
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    // get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage;

    // validation:- Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: true,
        message: "All fields are required",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });
    console.log("Instructor Details ->>", instructorDetails);
    //TODO: verify that userId and instructorDetails._id is same or different

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    // check given tag is valid or not
    const categoryDetail = await Category.findById(category);
    if (!categoryDetail) {
      return res.status(404).json({
        success: false,
        message: "Tag details not found",
      });
    }

    // upload Thumbnail image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    //create an entry for new course in db
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      instructor: instructorDetails,
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      category: categoryDetail,
      thumbnail: thumbnailImage.secure_url,
      tag: tag,
      status: status,
      instructions: instructions,
    });

    // add the new course to the user schema of Instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    // Return the new course and a success message
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Failed to create course",
      error: error.message,
    });
  }
};

//! getAllCourses Handler Function
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
    return res.status(404).json({
      success: false,
      message: "Cannot Fetch course data",
      error: error.message,
    });
  }
};

//TODO getCourseDetail ka handler function likhna hai sabkuchh populate karana hai with section subsection

//TODO ratingAndReview me tin function likhne hai-
//1:- createRating
//2:- getAverageRating
//3:- getAllRating
