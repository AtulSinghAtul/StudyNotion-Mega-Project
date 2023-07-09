const Category = require("../models/Category");

//! create tags handler function
exports.createCategory = async (req, res) => {
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
    const categoryDetailes = await Category.create({
      name: name,
      description: description,
    });
    console.log("tagDetailes ->>", categoryDetailes);

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
exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );

    console.log("All Tags ->>", allCategory);

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
