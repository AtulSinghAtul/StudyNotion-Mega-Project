const Section = require("../models/Section");
const Course = require("../models/Course");

//! create section
exports.createSection = async (req, res) => {
  try {
    //fetch data
    const { sectionName, courseId } = req.body;

    // validate data
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    //create section
    const newSection = Section.create({
      sectionName,
    });

    // update course with section objectId
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      {
        new: true,
      }
    ).populate();

    // TODO:- H/W use populate to replace sections/subsections both in the updatedCourseDetails

    console.log("updatedCourseDetails ->>", updatedCourseDetails);

    //return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create section, please try again",
      error: error.message,
    });
  }
};

//! update section
const updateSection = async (req, res) => {
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
      { sectionId },
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
    const { sectionId } = req.params;

    // delete data
    const deletedSection = await Section.findByIdAndDelete(sectionId);
    //TODO[TESTING]: do we need to delete the entry from the course schema ??
    console.log("deletedSection ->>", deletedSection);

    // return response
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section, please try again",
      error: error.message,
    });
  }
};
