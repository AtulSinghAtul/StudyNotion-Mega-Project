const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerficationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Varification Email from StudyNotion",
      otp
    );
  } catch (error) {
    console.log("error occured while sending mailes:", error);
    throw error;
  }
}

module.exports = mongoose.model("OTP", OTPSchema);
