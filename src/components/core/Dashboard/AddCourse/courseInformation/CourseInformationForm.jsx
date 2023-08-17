import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { HiOutlineCurrencyRupeee } from "react-icons/hi";
import RequirementField from "./RequirementField";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [course, editCourse] = useState((state) => state.course);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCateories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();

      if (categories.length > 0) {
        setCourseCategories(categories);
      }

      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseShortDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("conseImage", course.thumbnail);
    }

    getCateories();
  }, []);

  const onSubmit = async (data) => {};

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        <div>
          <label htmlFor="courseTitle">
            Course Title <sup>*</sup>
          </label>
          <input
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className="w-full"
          />
          {errors.courseTitle && <span>Course Title is Required**</span>}
        </div>

        <div>
          <label htmlFor="courseShortDesc">
            Course Short Description <sup>*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
            className="w-full min-h-[140px]"
          />
          {errors.courseShortDesc && (
            <span>Course Description is Required**</span>
          )}
        </div>

        <div>
          <label htmlFor="coursePrice">
            Course Price <sup>*</sup>
          </label>
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full"
          />
          <HiOutlineCurrencyRupeee />
          {errors.coursePrice && <span>Course Price is Required**</span>}
        </div>

        <div>
          <label htmlFor="courseCategory">
            Course Category<sup>*</sup>
          </label>
          <select
            id="courseCategory"
            defaultValue=""
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories.map((category, index) => (
                <option key={index} value={category?.id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && <span>Course Category is Required**</span>}
        </div>
        {/* create a custom component for handling tags input */}
        {/* <ChipInput
    register={register}
    placeholder="Enter tags and press enter"
    name="courseTags"
    label="Tags"
    setValue={getValue}
    getValue={setValue}
    errors={errors}
/> */}

        {/* create a component for uploading and showing preview of media */}
        {/* <Upload 
  name=""
  label=""
  register={}
  errors=""
  setValue={}
/> */}

        {/* Benefits of the course */}
        <div>
          <label>
            Benifits of the course<sup>*</sup>
          </label>
          <textarea
            id="coursebenefits"
            placeholder="Enter Benifits of the course"
            {...register("courseBenefits", {
              required: true,
            })}
            className="w-full min-h-[130px]"
          />
          {errors.courseBenefits && (
            <span>Benifits of the course are required</span>
          )}
        </div>

        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValue={getValue}
        />
      </form>
    </div>
  );
};

export default CourseInformationForm;
