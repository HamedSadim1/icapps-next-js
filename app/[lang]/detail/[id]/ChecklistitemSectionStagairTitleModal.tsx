import React, { FormEvent, useState } from "react";
import useStagairStore from "@/store";
import { IChecklistItem } from "@/types";
import useCheckListItemUpdateModal from "@/hooks/useCheckListItemUpdateModal";
import { inputFormDater } from "@/lib";
import getTranslation from "../../components/getTranslation";
import { Locale } from "@/i18n-config";
import { MdClose } from "react-icons/md";
import useChecklistSectionTitleStagairUpdateModal from "@/hooks/useChecklistSectionTitleStagairUpdateModal";

interface ChecklistitemSectionStagairTitleModalProps {
  lang: string;
  showDiv: boolean; //TRUE OR FALSE
  setDiv: React.Dispatch<React.SetStateAction<boolean>>; // Dit lees of het true or false of setDiv:(succes:boolean)=>void;
}

const ChecklistitemSectionStagairTitleModal: React.FC<ChecklistitemSectionStagairTitleModalProps> = ({
  lang,
  showDiv,
  setDiv,
}) => {
  const translation = getTranslation(lang as Locale);

  const checklistSectionTitleStagiair = useStagairStore(
    (s) => s.checklistSection
  );
  const setChecklistSectionTitleStagiair = useStagairStore(
    (s) => s.setChecklistSection
  );

  const { mutate } = useChecklistSectionTitleStagairUpdateModal(
    checklistSectionTitleStagiair.id,
    checklistSectionTitleStagiair
  );

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate();
      setDiv(false); //automatisch modal close
    } catch (error) {
      console.log("Error updating checklist item:", error);
    }
  };

  return (
    <>
      {showDiv && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white shadow-xl w-4/10 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={() => setDiv(false)} // Close the modal
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-[#002548] font-semibold text-2xl flex">
                SectionTitle &nbsp;{" "}
              </h2>
              <form method="dialog" onSubmit={handleSubmitForm} className="">
                <div className="form-control">
                  <label className="label text-base mb-5">
                    <span className="label-text text-base text-gray-500">
                      {translation.detail.checklisttitle}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Titel wijzigen"
                    className="w-full p-3 border-2 rounded-md mb-5"
                    value={checklistSectionTitleStagiair.sectionTitle}
                    onChange={(e) =>
                      setChecklistSectionTitleStagiair({
                        ...checklistSectionTitleStagiair,
                        sectionTitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full text-right mt-2 ">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                    onClick={() => setDiv(false)} //close modal
                  >
                    {translation.detail.cancel}
                  </button>
                  <button className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500">
                    {translation.detail.save}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChecklistitemSectionStagairTitleModal;
