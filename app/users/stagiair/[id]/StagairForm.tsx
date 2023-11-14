"use client";
import { FormEvent, useEffect, useState } from "react";
import useStagairStore from "@/store";
import Select from "react-select";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";
import useStagair from "@/hooks/useStagair";
import { inputFormDater } from "@/lib";
import { AiOutlineClose } from "react-icons/ai";
import useUpdateStagiair from "@/hooks/useUpdateStagiair";

interface Params {
  params: { id: string };
}

const StagairForm = ({ params: { id } }: Params) => {
  const { data: stagair } = useStagair(id);
  const data = useStagairStore((state) => state.stagaires);
  const setData = useStagairStore((state) => state.setStagaires);
  const { data: stagebegeleiders } = useStagebegeleiders();
  const { mutate, data: updatedData, isSuccess } = useUpdateStagiair(id, data);

  useEffect(() => {
    if (stagair) {
      useStagairStore.setState({ stagaires: stagair });
    }
  }, [stagair, isSuccess, updatedData]);

  const isModalOpen = useStagairStore((s) => s.stagiairModal);
  const setIsModalOpen = useStagairStore((state) => state.toggleModal);

  useEffect(() => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;

    if (modal) {
      if (isModalOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isModalOpen]);

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate();
    setIsModalOpen();
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsModalOpen();
    e.preventDefault();
    console.log("Modal closed");
  };

  if (!stagebegeleiders || !data) {
    return null;
  }

  return (
    <dialog
      id="my_modal_3"
      className={`modal ${isModalOpen ? "open" : "close"} cursor-auto`}
    >
      {isModalOpen && (
        <div className="modal-box px-10 py-10 cursor-auto">
          <h2 className="mb-8 text-[#002548] font-semibold text-2xl flex ">
                Stagiair wijzigen
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
                  Naam
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
                  Email
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
                  Startdatum
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
                  min={inputFormDater(new Date().toISOString().split("T")[0])}
                />
              </div>
              <div>
                <label className="text-gray-700" htmlFor="endDate">
                  Einddatum
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
                  Stagebegeleider(s)
                </label>

                <Select
                  defaultValue={
                    stagair?.stagebegeleider.map((stagebegeleider) => ({
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

              <button
                className="px-10 py-2 mt-2 text-white font-semibold bg-[#002548] rounded-md absolute bottom-10 right-10 hover:bg-blue-500"
                type="submit"
              >
                Opslaan
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default StagairForm;
