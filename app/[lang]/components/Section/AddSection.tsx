import { FormEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import usePostChecklistSection from "@/hooks/usePostChecklistSection";
import getTranslation from "../getTranslation";
import { Locale } from "@/i18n-config";
import useStagairStore from "@/store";

interface Props {
  lang: string;
  stagairId: string;
  secionId:string,
}

const AddSection = ({ lang, stagairId,secionId }: Props) => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const translation = getTranslation(lang as Locale);

  const checklistSection = useStagairStore((s) => s.checklistSection);
  const setChecklistSection = useStagairStore((s) => s.setChecklistSection);
  const { mutate } = usePostChecklistSection();

  const handlePostChecklistStagiair = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(checklistSection);
    setChecklistSection({
      id:"",
      createdAt: "",
      updatedAt: "",
      sectionTitle: "",
      stagiairID: stagairId,
      items: [],
    });
    setDiv(false);
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
              <form onSubmit={handlePostChecklistStagiair}>
                <label htmlFor="section"> {translation.detail.section}</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="section"
                  id="section"
                  placeholder=""
                  onChange={(e) =>
                    setChecklistSection({
                      ...checklistSection,
                      sectionTitle: e.target.value,
                    })
                  }
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
