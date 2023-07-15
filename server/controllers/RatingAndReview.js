const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//TODO ratingAndReview me tin function likhne hai-
//! 1:- createRating
exports.createRating = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;
    //fetch data from req body
    const { rating, review, courseId } = req.body;
    //check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }
    //check if user already reviewd the course
    const RatingAndReview = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (RatingAndReview) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }
    //create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });
    //update course with this rating and review
    const updatedCourseDetailes = await Course.findByIdAndUpdate(
      { _id: courseId },
      { ratingAndReviews: ratingReview._id }
    );
    console.log(updatedCourseDetailes);
    //return response
    return res.status(200).json({
      success: true,
      message: "Rating and Review created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Rating and Review not created  ",
    });
  }
};

//! 2:- getAverageRating
exports.getAverageRating = async (req, res) => {
  try {
    // get course id
    const courseId = req.body.courseId;

    //calculating avg rating
    const result = await RatingAndReview.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      {
        $group: { _id: null, averageRating: { $avg: "$rating" } },
      },
    ]);

    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // if no rating/review exist
    return res.status(200).json({
      success: true,
      message: "Average rating is 0, no rating gives till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! 3:- getAllRating
exports.getAllRating = async (req, res) => {
  try {
    const allReview = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      // user me populate karane ka naya method
      .populate({ path: "user", seclect: "fiestName lastName email image" })
      .populate({ path: "course", select: "courseName" })
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "All review fetched successfully",
      data: allReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
