const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//! Send OTP
// HW -> email valdation karo email sahi hai ya nhi

exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req body
    const email = req.body.email;

    // check user already exist or not
    const checkUserPresent = await User.findOne({ email });

    // check if user already exist
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // if user not exist then generate OTP
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP Generated ->>", otp);

    // check unique OTP or not
    let uniqueOtpResult = await OTP.findOne({ otp: OTP });

    // if get otp same then do generate otp continue till when not get unique otp
    while (uniqueOtpResult) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      uniqueOtpResult = await OTP.findOne({ otp: otp });
    }

    const otpPayload = {
      email,
      otp,
    };

    // create an entry for otp in database
    const otpBody = await OTP.create(otpPayload);
    console.log("otpBody ->>", otpBody);

    // return response successfull
    res.status(200).json({
      successs: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      successs: false,
      message: "not sent otp something is error",
      error: error.message,
    });
  }
};

//! signUp

exports.signUp = async (req, res) => {
  try {
    // data fetch from req ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // validate kar lo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: " All field are required",
      });
    }

    // dono password match karenge
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          " Password and ConfirmPassword value does not match, please try again",
      });
    }

    // check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // find most recent OTP stored for the user
    const recentOtp = OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("recentOtp", recentOtp);

    // validate OTP
    if (recentOtp.length == 0) {
      //otp not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      // invalid otp
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // entry create in db

    const profileDetails = await Profile.create({
      gender: null,
      dob: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNumber,
      additionalDetailes: profileDetails,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // return res
    return res.status(200).json({
      success: false,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

//! login
exports.login = async (req, res) => {
  try {
    // fetch data from req
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required, please try again",
      });
    }
    // user check exist or not
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signup first",
      });
    }
    // generate jwt, after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

//! change password
//HW: ToDo
exports.changePassword = async (req, res) => {
  // get data from req body
  const { password, confirmPassword } = req.body;
  console.log(password);

  // get old password, newpassword, confirmPassword
  // validation
  // update password in db
  // send mail - password updated
  // return response
};
