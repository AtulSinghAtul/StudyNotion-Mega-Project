import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Qutote";
import founding from "../assets/Images/FoundingStory.png";
import StatsComponents from "../components/core/AboutPage/StatsComponents";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/LearningGrid";
import Footer from "../components/common/Footer";

const AboutUs = () => {
  return (
    <div className="text-white w-11/12 max-w-maxContent mx-auto">
      {/* section 1 */}
      <section>
        <div>
          <header>
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p>
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          <div className="flex gap-x-3">
            <img src={aboutus1} alt="aboutus1Img" />
            <img src={aboutus2} alt="aboutus2Img" />
            <img src={aboutus3} alt="aboutus3Img" />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section>
        <div>
          <Quote />
        </div>
      </section>

      {/* section 3 */}
      <section>
        <div className="flex flex-col gap-8">
          {/* founding story div */}
          <div className="flex gap-3">
            <div>
              <span className="text-brown-400">Our Founding Story </span>
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div>
              <img src={founding} alt="sectionImg" />
            </div>
          </div>

          {/* our vission div */}
          <div className="flex gap-3">
            <div>
              <span className="text-brown-400">Our Vision</span>
              <p>
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            <div>
              <HighlightText text={"Our Mission"} />

              <p>
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section>
        <StatsComponents />
      </section>

      {/* section 5 grid box */}
      <section className=" flex flex-col justify-center items-center w-fit">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* section 6 */}
      <section>
        <div>Reviews from other learners</div>
        {/* <ReviewSlider/> */}
        <Footer />
      </section>
    </div>
  );
};

export default AboutUs;
