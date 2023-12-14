import React, { FormEvent } from "react";
import { MdClose } from "react-icons/md";
import useStagairStore from "@/store";
import { inputFormDater } from "@/lib";
import getTranslation from "../../components/getTranslation";
import { Locale } from "@/i18n-config";
import useCheckListItemBegeleiderUpdateModal from "@/hooks/useCheckListItemBegeleiderUpdateModal";

interface ChecklistBegeleiderItemsModalProps {
  lang: string;
  showDiv: boolean;
  setDiv: React.Dispatch<React.SetStateAction<boolean>>;  // true or false value reader
}

const ChecklistBegeleiderItemsModal: React.FC<ChecklistBegeleiderItemsModalProps> = ({
  lang,
  showDiv,
  setDiv, // krijg je mee van component editbuttonbegleider
}) => {
  const translation = getTranslation(lang as Locale);

  const checklistItemBegeleider = useStagairStore((s) => s.checklistItemBegeleider);
  const setChecklistItemBegeleider = useStagairStore((s) => s.setchecklistItemBegeleider);

  const { mutate } = useCheckListItemBegeleiderUpdateModal(
    checklistItemBegeleider.id,
    checklistItemBegeleider
  );

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate(); // update the new items
      setDiv(false); // close modal
    } catch (error) {
      console.log("Error updating checklist item:", error);
    }
  };
  if (typeof window !== "undefined") { // close image if escape is pressed
    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key == "Escape") {
          setDiv(false);

        }
    })

}
  return (
    <>
      {showDiv && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white shadow-xl w-4/10 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={() => setDiv(false)} // close modal
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-[#002548] font-semibold text-2xl flex">
                Item &nbsp;{" "}
              </h2>
              <form method="dialog" onSubmit={handleSubmitForm} className="">
                <div className="form-control">
                  <label className="label text-base mb-5">
                    <span className="label-text text-base text-gray-500">
                      {translation.detail.checklistitem}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Titel wijzigen"
                    className="w-full p-3 border-2 rounded-md mb-5"
                    value={checklistItemBegeleider.title}
                    onChange={(e) =>
                      setChecklistItemBegeleider({  // new title item
                        ...checklistItemBegeleider,
                        title: e.target.value,
                      })
                    }
                  />
                  <label className="label text-base mb-5">
                    <span className="label-text text-base text-gray-500">
                      {translation.detail.date}
                    </span>
                  </label>
                  <input
                    value={inputFormDater(checklistItemBegeleider.date)}
                    type="date"
                    placeholder={checklistItemBegeleider.date}
                    className="w-full p-3 border-2 rounded-md mb-5"
                    onChange={(e) =>
                      setChecklistItemBegeleider({ //new title date
                        ...checklistItemBegeleider,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full text-right mt-2 ">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                    onClick={() => setDiv(false)} // close modal
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

export default ChecklistBegeleiderItemsModal;
