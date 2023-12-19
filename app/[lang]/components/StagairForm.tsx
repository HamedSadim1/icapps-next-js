"use client";
import { FormEvent, useEffect, useState } from "react";
import useStagairStore from "@/store";
import Select from "react-select";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";
import { inputFormDater } from "@/lib";
import { AiOutlineClose } from "react-icons/ai";
import useUpdateStagiair from "@/hooks/useUpdateStagiair";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";
import { ClipLoader } from "react-spinners";

interface Params {
  params: { lang: string };
}

const StagairForm = ({ params: { lang } }: Params) => {
  const translation = getTranslation(lang as Locale);
  //? get stagairId from store
  const stagaireId = useStagairStore((s) => s.stagairId);
  //? get stagaires from store
  const data = useStagairStore((state) => state.stagaires);
  //? set stagaires to store
  const setData = useStagairStore((state) => state.setStagaires);
  //? get stagebegeleiders from hook
  const { data: stagebegeleiders, error } = useStagebegeleiders();
  //? hook to update Stagiair
  const { mutate } = useUpdateStagiair(stagaireId, data);
  //? state for modal
  const isModalOpen = useStagairStore((s) => s.stagiairModal);
  const setIsModalOpen = useStagairStore((state) => state.toggleModal);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    //? get modal
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;

    //? check if modal exist
    if (modal) {
      if (isModalOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isModalOpen]);

  //? handle submit form
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSpinner(true); //loading
      await mutate();
      setTimeout(() => {
        setIsModalOpen();
        setSpinner(false); //loading
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  //? close modal
  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsModalOpen();
    e.preventDefault();
    console.log("Modal closed");
  };
  if (error) {
    throw new Error(error.message);
  }

  if (!stagebegeleiders || !data) {
    return null;
  }

  return (
    <dialog
      id="my_modal_3"
      className={`modal ${
        isModalOpen ? "open" : "close"
      } cursor-auto duration-0 rounded-md`}
    >
      {isModalOpen && (
        <div className="px-10 py-10 shadow-xl h-auto ">
          <h2 className="mb-8 text-[#002548] font-semibold text-2xl flex ">
            {translation.userStagiair["internedit"]}
          </h2>
          <form onSubmit={handleSubmitForm} method="dialog">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 "
            >
              <AiOutlineClose />
            </button>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700" htmlFor="name">
                  {translation.userStagiair["name"]}
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md pointer-events-auto"
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-gray-700" htmlFor="email">
                  {translation.userStagiair["e-mail"]}
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md pointer-events-auto"
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-gray-700" htmlFor="startDate">
                  {translation.userStagiair["startingdate"]}
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md pointer-events-auto"
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={inputFormDater(data.startDate)}
                  onChange={(e) =>
                    setData({ ...data, startDate: e.target.value })
                  }
                  min={inputFormDater(data.startDate)}
                />
              </div>
              <div>
                <label className="text-gray-700" htmlFor="endDate">
                  {translation.userStagiair["endingdata"]}
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md pointer-events-auto"
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={inputFormDater(data.endDate)}
                  onChange={(e) =>
                    setData({ ...data, endDate: e.target.value })
                  }
                  min={inputFormDater(new Date().toISOString().split("T")[0])}
                />
              </div>
              <div>
                <label className="text-gray-700" htmlFor="stagebegeleider">
                  {translation.userStagiair["internshipsupervisors"]}
                </label>

                <Select
                  defaultValue={
                    data.stagebegeleider?.map((stagebegeleider) => ({
                      label: stagebegeleider.name,
                      value: stagebegeleider.id,
                    })) || []
                  }
                  isMulti
                  name="stagebegeleider"
                  options={stagebegeleiders.map((stagebegeleider) => ({
                    label: stagebegeleider.name,
                    value: stagebegeleider.id,
                  }))}
                  className="basic-multi-select pointer-events-auto"
                  classNamePrefix="select"
                  onChange={(selected, actionMeta) => {
                    //! selectedOptions is an array of unique strings
                    const selectedOptions = Array.from(
                      new Set(selected.map((option) => option.value))
                    );
                    //! setData is an array of unique stagebegleiderIds
                    setData({
                      ...data,
                      stagebegeleiderId: selectedOptions,
                    });
                  }}
                />
              </div>
              <div className="w-full">
                {spinner == true ? (
                  <button
                    className="px-10 py-2 mt-2 text-white font-semibold bg-[#002548] rounded-md block sm:absolute bottom-10 right-10 hover:bg-blue-500 pointer-events-none w-full sm:w-auto"
                    type="submit"
                  >
                    <ClipLoader
                      color={"#ffffff"}
                      loading={true}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </button>
                ) : (
                  <button
                    className="px-10 py-2  text-white font-semibold bg-[#002548] rounded-md block sm:absolute bottom-10 right-10 hover:bg-blue-500 w-full sm:w-auto"
                    type="submit"
                  >
                    {translation.userStagiair["save"]}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default StagairForm;
