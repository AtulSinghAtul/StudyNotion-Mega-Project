import React from "react";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-fit">
      <div className="flex gap-5">
        <div className="text-[40px]"> Hello</div>
        <div>
          <ContactFormSection />
        </div>
      </div>
      <div className="w-[100%]">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
