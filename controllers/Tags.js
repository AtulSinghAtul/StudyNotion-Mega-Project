const Tag = require("../models/Tags");

//! create tags handler function
exports.createTag = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;

    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create entry in db
    const tagDetailes = await Tag.create({
      name: name,
      description: description,
    });
    console.log("tagDetailes ->>", tagDetailes);

    //return response
    return res.status(200).json({
      success: true,
      message: "Tag created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! get all tags handler function
exports.showAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });

    console.log("All Tags ->>", allTags);

    return res.status(200).json({
      success: true,
      message: " all tags returned successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
