"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FormEvent, useState } from "react";
import { GoGoal } from "react-icons/go";
import useStagairStore from "@/store";
import usePostDoel from "@/hooks/usePostDoel";
import { inputFormDater } from "@/lib";
import usePostNotification from "@/hooks/usePostNotification";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";
import { ClipLoader } from "react-spinners";

interface DoelProps {
  stagiarId: string;
  lang: string;
}

const Doel = ({ stagiarId, lang }: DoelProps) => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const translation = getTranslation(lang as Locale);
  // const stagaires = useStagairStore((s) => s.stagaires);
  const [spinner, setSpinner] = useState(false);//loading
  const doel = useStagairStore((s) => s.doel);
  const setDoel = useStagairStore((s) => s.setDoel);
  const { mutate, error, isSuccess } = usePostDoel(doel, stagiarId);
  const pushNotificationId = useStagairStore((s) => s.pushNotificationId);
  const { mutate: MutateNotification } =
    usePostNotification(pushNotificationId);

  const handleSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinner(true);//loading
    await mutate();
    setTimeout(() => {
      setSpinner(false);//loading
      setDiv(false);
    }, 7000);
    if (error) {
      console.log(error);
    }

    await MutateNotification({
      include_player_ids: [pushNotificationId],
      headings: { en: "New Post", nl: " Nieuw doel" },
      contents: {
        en: "A new doel has been added",
        nl: "Er is een nieuw doel toegevoegd",
      },
    });
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
      <div className="flex justify-between">
        <div className="flex">
          <GoGoal className="text-3xl text-blue-400 mr-4 mb-1" />
          <h2 className="font-bold text-2xl mb-1 text-[#002548]">{translation.detail.goals}</h2>
        </div>
        <div onClick={() => setDiv(true)} className="flex px-4 py-2 text-[#002548] font-semibold bg-blue-50 cursor-pointer rounded-md hover:bg-blue-200">
          <button>
            <AiOutlinePlus className="float-left mt-1"></AiOutlinePlus>
            &nbsp;{translation.detail.newgoal}
          </button>
        </div>
      </div>
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className=" bg-white shadow-xl h-auto pb-7 xs:mx-5  text-gray-500  rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-6 sm:pb-10 text-[#002548] font-semibold text-2xl flex">
                {translation.detail.addgoal} &nbsp;{" "}
              </h2>
              <form onSubmit={handleSubmitButton}>
                <label htmlFor="titel">{translation.detail.title}</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="titel"
                  id="titel"
                  value={doel.title}
                  onChange={(e) => setDoel({ ...doel, title: e.target.value })}
                />
                <label htmlFor="beschrijving">{translation.detail.description}</label>
                <textarea
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="beschrijving"
                  id="beschrijving"
                  value={doel.body}
                  onChange={(e) => setDoel({ ...doel, body: e.target.value })}
                ></textarea>
                <label htmlFor="einddatum">{translation.detail.enddate}</label>
                <br />
                <input
                  className="p-3 border-2 rounded-md mb-5"
                  type="date"
                  name="einddatum"
                  id="einddatum"
                  value={inputFormDater(doel.endDate)}
                  onChange={(e) =>
                    setDoel({ ...doel, endDate: e.target.value })
                  }
                  min={inputFormDater(new Date().toISOString().split("T")[0])}
                />
                <div className="flex flex-col sm:flex-row justify-end gap-5 w-full">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-50 w-full sm:w-auto text-[#002548] font-semibold hover:bg-blue-200"
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
                    <button
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
export default Doel;
