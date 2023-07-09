const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//! create sub section
exports.createSubsection = async (req, res) => {
  try {
    // fetch data from req body
    const { sectionId, title, timeDuration, description } = req.body;

    // extract file/video
    const video = req.files.videoFile;

    // valdation
    if (!sectionId || !timeDuration || !title || !description || !video) {
      return res.status(400).json({
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

    //create a subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetailes.secure_url,
    });

    //update section with this subsection objectid
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate();

    // TODO:- H/W log updated section here, after adding populate query
    console.log("updatedSection ->>", updatedSection);

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection created successfully ",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Subsection creation failed, something went wrong ",
      error: error.message,
    });
  }
};

//TODO H/W:- update subsction handler
exports.updateSubsection = async (req, res) => {
  try {
    // data fetch input
    const { sectionId, title, timeDuration, description } = req.body;

    //data validation
    if (!sectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // update data
    const updateSubsectionData = await SubSection.findByIdAndUpdate(
      {
        sectionId,
      },
      { title, timeDuration, description },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updateSubsectionData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Subsection creation failed, something went wrong ",
      error: error.message,
    });
  }
};

//TODO H/W:- delete subsction handler
exports.deletedSubsection = async (req, res) => {
  try {
    //get id
    const { sectionId } = req.body;

    // delete id
    const deleteSubsectionDetails = await SubSection.findByIdAndDelete(
      sectionId
    );
    console.log("deleteSubsectionDetails ->>", deleteSubsectionDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "SubSection Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section, please try again",
      error: error.message,
    });
  }
};
