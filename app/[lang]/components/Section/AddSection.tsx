import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import getTranslation from "../getTranslation";
import { Locale } from "@/i18n-config";

interface Props {
  lang : string
}

const AddSection = ({lang}:Props) => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const translation = getTranslation(lang as Locale)
  return (
    <>
      {showDiv == false && (
        <button
          className="text-gray-500 hover:text-gray-900 flex gap-1 ml-auto"
          onClick={() => setDiv(true)}
        >
          <AiOutlinePlus className="float-left mt-1" /> {translation.detail.addsection}
        </button>
      )}

      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white shadow-2xl w-1/3 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-[#002548] font-semibold text-2xl flex">
              {translation.detail.addsection}&nbsp;
              </h2>
              <form>
                <label htmlFor="section"> {translation.detail.section}</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="section"
                  id="section"
                  // onChange={(e) => setItem({ ...item, title: e.target.value })}
                />
                <label htmlFor="einddatum"> {translation.detail.date}</label>
                <br />
                <input
                  className="p-3 border-2 rounded-md mb-5"
                  type="date"
                  name="einddatum"
                  id="einddatum"
                  // onChange={(e) => setItem({ ...item, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
                <div className="w-full text-right">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                    onClick={() => setDiv(false)}
                  >
                     {translation.detail.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500"
                  >
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

export default AddSection;