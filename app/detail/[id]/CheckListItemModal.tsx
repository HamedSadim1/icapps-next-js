import React, { FormEvent, useEffect, useState } from "react";
import useStagairStore from "@/store";
import { IChecklistItem } from "@/types";
import useUpdateChecklistItem from "@/hooks/useUpdateCheckListItem";
import useCheckListItemUpdateModal from "@/hooks/useCheckListItemUpdateModal";
import { inputFormDater } from "@/lib";

interface CheckListItemModalProps {
  checklistItem: IChecklistItem;
  id: string;
}

const CheckListItemModal = ({ checklistItem, id }: CheckListItemModalProps) => {
  const isModalOpen = useStagairStore((s) => s.checklistModal);
  const setIsModalOpen = useStagairStore((state) => state.setChecklistModal);

  const checklistItemStagiair = useStagairStore((s) => s.checklistItemStagiair);
  const setChecklistItemStagiair = useStagairStore(
    (s) => s.setchecklistItemStagiair
  );

  const { mutate } = useCheckListItemUpdateModal(
    checklistItemStagiair.id,
    checklistItemStagiair
  );

  useEffect(() => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;

    if (modal) {
      if (isModalOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isModalOpen]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate();
      handleModalClose();
    } catch (error) {
      console.log("Error updating checklist item:", error);
    }
  };

  return (
    <dialog id="my_modal_4" className="modal duration-0 rounded-md">
      {isModalOpen && (
        <div className="modal-box p-10">
          <h1 className="text-2xl font-semibold mb-5 text-[#002548]">
            Checklist item wijzigen
          </h1>
          <form method="dialog" onSubmit={handleSubmitForm} className="">
            <div className="form-control">
              <label className="label text-base mb-5">
                <span className="label-text text-base text-gray-500">
                  Titel
                </span>
              </label>
              <input
                type="text"
                placeholder="Titel wijzigen"
                className="w-full p-3 border-2 rounded-md mb-5"
                value={checklistItemStagiair.title}
                onChange={(e) =>
                  setChecklistItemStagiair({
                    ...checklistItemStagiair,
                    title: e.target.value,
                  })
                }
              />
              <label className="label text-base mb-5">
                <span className="label-text text-base text-gray-500">
                  Datum
                </span>
              </label>
              <input
                value={inputFormDater(checklistItemStagiair.date)}
                type="date"
                placeholder={checklistItemStagiair.date}
                className="w-full p-3 border-2 rounded-md mb-5"
                onChange={(e) =>
                  setChecklistItemStagiair({
                    ...checklistItemStagiair,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full text-right mt-2 ">
              <button
                className="mr-4 px-7 py-2 rounded-md bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                onClick={handleModalClose}
              >
                Annuleren
              </button>
              <button className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500">
                Opslaan
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default CheckListItemModal;
