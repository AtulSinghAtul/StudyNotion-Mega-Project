const Section = require("../models/Section");
const Course = require("../models/Course");
const mongoose = require("mongoose");

//! CREATE a new section
exports.createSection = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { sectionName, courseId } = req.body;

    // validate data
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    // Create a new section with the given name
    const newSection = await Section.create({
      sectionName,
    });

    // let id = new mongoose.Types.ObjectId(newSection._id);
    // console.log("id-------->>", id);

    // Add the new section to the course's content array
    console.log("section -->", newSection);
    console.log("section id-->", newSection._id);
    console.log("course id-->", courseId);
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // TODO:- H/W use populate to replace sections/subsections both in the updatedCourseDetails

    console.log("updatedCourseDetails ->>", updatedCourseDetails);

    // Return the updated course object in the response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to create section, please try again",
      error: error.message,
    });
  }
};

//! Update a section
exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body;

    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // update data
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    console.log("updatedSection ->>", updatedSection);

    // return response
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to update section, please try again",
      error: error.message,
    });
  }
};

//! delete section
exports.deleteSection = async (req, res) => {
  try {
    //get id - assuming that we are sending id in params
    //* HW:- req.params k sath test karo
    const { sectionId } = req.body;

    // delete data
    const deletedSection = await Section.findByIdAndDelete(sectionId);
    //TODO[TESTING]: do we need to delete the entry from the course schema ?? COURSE KO BHI UPDATE KARO
    const courseDetailes = await Course.find();
    console.log("for updated course courseDetailes--->>>", courseDetailes);
    // const courseId = courseDetailes[1]._id;

    console.log("courseId ------>>", courseId);

    const pulledCourse = await Course.findByIdAndDelete(courseId, {
      courseContent: sectionId,
    });

    console.log("pulledCourse------->>", pulledCourse);

    console.log("deletedSection ->>", deletedSection);

    // return response
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete section, please try again",
      error: error.message,
    });
  }
};
