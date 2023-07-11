const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//!Reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from req body
    const { email } = req.body;
    // check user for this email, email validation
    const user = User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "your email is not registered with us",
      });
    }
    // generate token
    // const token = crypto.randomUUID();
    const token = crypto.randomBytes(20).toString("hex");

    // update user by adding token and expiration time
    const udatedDetailes = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    console.log("udatedDetailes->", udatedDetailes);

    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail containing the url
    await mailSender(
      email,
      "Password reset link",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );
    // return response
    return res.json({
      success: true,
      message:
        "Email send successfully, please check email and change password",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Something went wrong while reset password mail",
    });
  }
};

//!reset password
exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body;
    //validation password
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }

    // get user details from db using token
    const userDetails = await User.findOne({ token: token });

    // if no entry - invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }

    // token time check
    if (userDetails.resetPasswordExpires > Date.now()) {
      return res.status(403).json({
        success: false,
        message: "Token is expired, please regenerate your token",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //password update
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Password reset successfull",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while sending reset password mail",
      error: error.message,
    });
  }
};
