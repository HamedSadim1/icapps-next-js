import { FormEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import usePostChecklistSection from "@/hooks/usePostChecklistSection";
import getTranslation from "../getTranslation";
import { Locale } from "@/i18n-config";
import useStagairStore from "@/store";
import usePostChecklistSectionBegeleider from "@/hooks/usePostChecklistSectionBegeleider";
import { ClipLoader } from "react-spinners";

interface Props {
  lang: string;
  stagairId: string;
  secionId:string,
}

const AddSectionBegeleider = ({ lang, stagairId,secionId }: Props) => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const translation = getTranslation(lang as Locale);
  const [spinner, setSpinner] = useState(false);

  const checklistSectionBegeleider = useStagairStore((s) => s.checklistSectionBegeleider);
  const setChecklistSectionBegeleider = useStagairStore((s) => s.setChecklistSectionBegeleider);
  const { mutate } = usePostChecklistSectionBegeleider();

  const handlePostChecklistStagiair = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinner(true);
    mutate(checklistSectionBegeleider);
    setChecklistSectionBegeleider({
      id: "",
      createdAt: "",
      sectionTitle: "",
      stagiairID: stagairId,
      checklistItem: [],
      date:""
    });
    setTimeout(() => {
      setSpinner(true);
      setDiv(false);
    }, 11000);  };
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
          <div className="bg-white shadow-xl h-auto pb-7 mx-5 text-gray-500 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-6 sm:pb-10 text-[#002548] font-semibold text-2xl flex">
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
                    setChecklistSectionBegeleider({
                      ...checklistSectionBegeleider,
                      sectionTitle: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col s:flex-row justify-end gap-5 w-full">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-50 w-full s:w-auto text-[#002548] font-semibold hover:bg-blue-200"
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
          </div>
        </div>
      )}
    </>
  );
};

export default AddSectionBegeleider;
