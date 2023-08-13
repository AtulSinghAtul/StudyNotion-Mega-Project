import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset({
      email: "",
      firstName: "",
      lastName: "",
      message: "",
      phoneNo: "",
    });
  }, [reset, isSubmitSuccessful]);

  async function submitContactForm(data) {
    console.log("Logging data", data);
    try {
      setLoading(true);
      const response = { status: "OK" };
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5 mb-5 ">
        <div className="flex gap-3">
          {/* first name */}
          <div>
            <label htmlFor="firstName"> First Name </label>
            <input
              className="text-black"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              {...register("firstName", { required: true })}
            />

            {errors.firstName && <span>Enter your first name</span>}
          </div>

          {/* last name */}
          <div>
            <label htmlFor="lastName"> Last Name </label>
            <input
              className="text-black"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              {...register("lastName")}
            />
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col">
          <label htmlFor="email"> Email Address </label>
          <input
            className="text-black"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email Address"
            {...register("email", { required: true })}
          />

          {errors.email && <span>Enter your email</span>}
        </div>

        {/* phone number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber">Phone Number</label>

          <div className="flex gap-5 ">
            {/* dropdown */}
            <div className="w-[50px]">
              <select
                className="text-black w-[100%]"
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((element, index) => (
                  <option key={index} value={element.code}>
                    {element.code} - {element.country}
                  </option>
                ))}
              </select>
            </div>
            <br />
            {/* phone field */}
            <div>
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 6789"
                className="text-black"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please Enter Phone Number",
                  },
                  maxLength: { value: 10, message: "Invalid phone Number" },
                  minLength: { value: 8, message: "Invalid phone Number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
        </div>

        {/* message */}
        <div className="flex flex-col">
          <label htmlFor="message"> Message </label>
          <textarea
            className="text-black"
            id="message"
            name="message"
            cols={`30`}
            rows={`7`}
            placeholder="Enter your message here"
            {...register("message", { required: true })}
          />

          {errors.message && <span>Please enter your message</span>}
        </div>

        {/* button */}
        <button
          type="submit"
          className="text-black bg-yellow-50 text-bold text-[16px] text-center px-6 rounded-md"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
