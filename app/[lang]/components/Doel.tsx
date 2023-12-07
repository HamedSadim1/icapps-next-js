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

interface DoelProps {
  stagiarId: string;
  lang: string;
}

const Doel = ({ stagiarId, lang }: DoelProps) => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const translation = getTranslation(lang as Locale);
  // const stagaires = useStagairStore((s) => s.stagaires);

  const doel = useStagairStore((s) => s.doel);
  const setDoel = useStagairStore((s) => s.setDoel);
  const { mutate, error, isSuccess } = usePostDoel(doel, stagiarId);
  const pushNotificationId = useStagairStore((s) => s.pushNotificationId);
  const { mutate: MutateNotification } =
    usePostNotification(pushNotificationId);

  const handleSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate();
    setDiv(false);
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

  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <GoGoal className="text-3xl text-blue-400 mr-4 mb-1" />
          <h2 className="font-bold text-2xl mb-1">{translation.detail.goals}</h2>
        </div>
        <div className="flex px-4 py-2 text-[#002548] font-semibold bg-blue-50  rounded-md hover:bg-gray-300">
          <button onClick={() => setDiv(true)} className="">
            <AiOutlinePlus className="float-left mt-1"></AiOutlinePlus>
            &nbsp;{translation.detail.newgoal}
          </button>
        </div>
      </div>
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white shadow-xl w-4/10 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-[#002548] font-semibold text-2xl flex">
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
                <div className="w-full text-right">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-100  text-[#002548] font-semibold hover:bg-blue-200"
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
export default Doel;
