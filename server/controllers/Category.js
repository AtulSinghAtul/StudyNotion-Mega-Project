const Category = require("../models/Category");

//^ NOTE:- Tag ko ham ne Category kar diya hai

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
      message: "Categorys created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! get all tags handler function
exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );

    console.log("All Tags ->>", allCategory);

    return res.status(200).json({
      success: true,
      message: " all tags returned successfully",
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! categoryPageDetails controller
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    console.log("selectedCategory------>>>", selectedCategory);
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    const selectedCourses = selectedCategory.courses;

    // Get courses for other categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();
    console.log("differentCategories -->", differentCategories);
    // let differentCourses = [];
    // for (const category of categoriesExceptSelected) {
    //   differentCourses.push(...category.courses);
    // }

    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate("courses");
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCourses: selectedCourses,
        // differentCourses: differentCourses,
        mostSellingCourses: mostSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};