const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const { mailSender } = require("../utils/mailSender");
const courseEnrollementEmail = require("../mail/templates/courseEnrollmentEmail");

//! capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  //get userId and courseId
  const userId = req.user.id;
  const { courseId } = req.body;

  //validation
  //courseId validation
  if (!courseId) {
    return res.json({
      success: false,
      message: "Please Provide Valid Course Id",
    });
  }

  //validation courseDetailes
  let courseDetailes;
  try {
    //get courseDetail
    courseDetailes = await Course.findById(courseId);
    if (!courseDetailes) {
      return res.json({
        success: false,
        message: "Course Details Not Found",
      });
    }

    //user already pay for the same course validate
    const uid = new mongoose.Types.ObjectId(userId);
    if (courseDetailes.studentEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "student is already enrolled",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // order ctreate state
  const amount = courseDetailes.price;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
    notes: {
      userId: userId,
      courseId: courseId,
    },
  };

  try {
    // initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log("paymentResponse", paymentResponse);
    // return response
    return res.status(200).json({
      success: true,
      message: "Order Created Successfully",

      courseName: courseDetailes.courseName,
      courseDescription: courseDetailes.courseDescription,
      thumbnail: courseDetailes.thumbnail,
      orderId: paymentResponse.id,
      amount: paymentResponse.amount,
      currency: paymentResponse.currency,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

//! verify Signature of Razorpay and Server
exports.verifySignature = async (req, res) => {
  //*secretKey from server
  const webhookSecret = "12345678";

  //* secret key from razorpay
  const signature = req.headers["x-razorpay-signature"];

  // hashing server secret key to matching from razorpay signature
  //Step-A
  const shasum = crypto.createHmac("sha256", webhookSecret);

  //Step-B
  shasum.update(JSON.stringify(req.body));

  //Step-C
  const digest = shasum.digest("hex");

  //match signature and hashing secret key(digest)
  if (signature === digest) {
    console.log(`Payment is Authorised`);

    //get userId and courseId from razorpay request body
    const { userId, courseId } = req.body.payload.payment.entity.notes;

    try {
      //fullfill the action
      // find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }

      //find the student and add the courses to their list enrolled course me
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      console.log(enrolledStudent);

      //mail send kar do for confirmation ki student course le liya hai
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from Codehelp",
        "Congratulations you are onboarded into new codehelp course"
      );
      console.log(emailResponse);

      //return response
      return res.status(200).json({
        success: true,
        message: "Signature verified and course added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error.message",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};
