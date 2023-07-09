const cloudinary = require("cloudinary").v2;

exports.imageUploader = (name, folder, height, quality, file) => {
  const options = { folder };
  options.height = height;
  options.quality = quality;

  resource_type = "auto";

  return cloudinary.uploader.upload(file.tempFilePath, options);
};
