import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import SubsectionModal from "./SubsectionModal";
import ConfirmationModal from "../../../../common/CofirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = (handleChangeEditSectionName) => {
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubsection] = useState(null);
  const [editSubSection, setEditSubsection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseid: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });

    if (result) {
      //TODO extra yanha kuchh kar sakte hain
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  return (
    <div>
      <div>
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary>
              <div>
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </div>

              <div>
                <button
                  onClick={handleChangeEditSectionName(
                    section._id,
                    section.sectionName
                  )}
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text: "All the lecture in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin5Fill />
                </button>
                <span>|</span>
                <IoMdArrowDropdown />
              </div>
            </summary>

            <div>
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubsection(data)}
                  className="flex items-center justify-between gap-x-3 border-b-2"
                >
                  <div>
                    <RxDropdownMenu />
                    <p>{data.title}</p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <button
                      onClick={() =>
                        setEditSubsection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => ({
                        text1: "Delete this Sub Section",
                        text: "Selected Lecture will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(data._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })}
                    >
                      {" "}
                      <RiDeleteBin5Fill />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={setAddSubsection(section._id)}
                className="mt-4 flex items-center gap-x-2 text-yellow-50"
              >
                <AiOutlinePlus />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubsectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubsectionModal
          modalData={viewSubSection}
          setModalData={setViewSubsection}
          view={true}
        />
      ) : editSubSection ? (
        <SubsectionModal
          modalData={editSubSection}
          setModalData={setEditSubsection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NestedView;
