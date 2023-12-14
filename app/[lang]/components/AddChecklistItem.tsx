"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FormEvent, useState } from "react";
import useStagairStore from "@/store";
import usePostChecklistItem from "@/hooks/usePostChecklistItem";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";
import { ClipLoader } from "react-spinners";

interface AddChecklistProps {
  checklistItemId: string;
  lang: string;
}
export const AddCheckListItem = ({ checklistItemId, lang }: AddChecklistProps) => {
  const [showDiv, setDiv] = useState(false);
  const translation = getTranslation(lang as Locale);
  console.log("checklistItemId  " + checklistItemId);

  const item = useStagairStore((s) => s.checklistItemStagiair);
  const setItem = useStagairStore((s) => s.setchecklistItemStagiair);

  const { mutate } = usePostChecklistItem(item, checklistItemId);

  const [spinner, setSpinner] = useState(false);//loading
  const handlePostChecklistStagiair = async (e: FormEvent<HTMLFormElement>) => {   
    e.preventDefault();
    setSpinner(true);//loading
    await mutate();
    setTimeout(() => {
      setDiv(false);
      setSpinner(false);//loading
    }, 4000);

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
      {showDiv == false && (
        <button
          className="text-gray-500 hover:text-gray-900 z-0 flex gap-1"
          onClick={() => setDiv(true)}
        >
          <AiOutlinePlus className="float-left mt-1" /> {translation.detail.additem}
        </button>
      )}
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white shadow-2xl w-1/3 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl"
              onClick={() => setDiv(false)}
            >
              <MdClose>x</MdClose>
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-[#002548] font-semibold text-2xl flex">
                {translation.detail.addsection} &nbsp;
              </h2>
              <form onSubmit={handlePostChecklistStagiair}>
                <label htmlFor="titel">{translation.detail.title}</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="titel"
                  id="titel"
                  onChange={(e) => setItem({ ...item, title: e.target.value })}
                />
                <label htmlFor="einddatum">{translation.detail.date}</label>
                <br />
                <input
                  className="p-3 border-2 rounded-md mb-5"
                  type="date"
                  name="einddatum"
                  id="einddatum"
                  onChange={(e) => setItem({ ...item, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
                <div className="w-full text-right">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                    onClick={() => setDiv(false)}
                  >
                    {translation.detail.cancel}
                  </button>
                  {spinner == true ? //loading
                    <button
                      type="submit"
                      className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500 pointer-events-none" 
                    >
                      <ClipLoader
                        color={"#ffffff"}
                        loading={true}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </button>
                    :
                    < button
                      type="submit"
                      className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500"
                    >
                      {translation.detail.save}
                    </button>
                  }
                </div>
              </form>
            </div>
          </div >
        </div >
      )}
    </>
  );
};
