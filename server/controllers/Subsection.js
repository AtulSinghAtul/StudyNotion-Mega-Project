const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//! Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, timeDuration, description } = req.body;

    // extract file/video
    const video = req.files.videoFile;

    // valdation
    if (!sectionId || !timeDuration || !title || !description || !video) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload video on cloudinary
    const uploadDetailes = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    console.log("uploadImageToCloudinary ->>", uploadImageToCloudinary);
    // Create a new sub-section with the necessary information
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetailes.secure_url,
    });

    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate("subSection");
    // TODO:- H/W log updated section here, after adding populate query --- done by me

    console.log("updatedSection ->>", updatedSection);

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection created successfully ",
      updatedSection,
    });
  } catch (error) {
    // Handle any errors that may occur during the process
    return res.status(500).json({
      success: false,
      message: "Subsection creation failed, something went wrong ",
      error: error.message,
    });
  }
};

//TODO H/W:- update subsction handler --- done by me
exports.updateSubSection = async (req, res) => {
  try {
    //get data
    const { title, timeDuration, description, sectionId } = req.body;

    //find subsection detailes
    const subSection = await SubSection.findById(sectionId);

    // put data inside subsection
    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.videoFile !== undefined) {
      const video = req.files.videoFile;

      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );

      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    //return response
    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: "SubSection updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
      error: error.message,
    });
  }
};

//TODO H/W:- delete subsction handler --- done by me
exports.deleteSubSection = async (req, res) => {
  try {
    //get id
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    // delete id
    const deleteSubsectionDetails = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });
    console.log("deleteSubsectionDetails ->>", deleteSubsectionDetails);

    if (!deleteSubsectionDetails) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    // return response
    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: "SubSection Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
      error: error.message,
    });
  }
};
