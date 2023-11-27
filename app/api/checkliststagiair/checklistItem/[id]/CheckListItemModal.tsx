import React, { FormEvent, useEffect, useState } from "react";
import useStagairStore from "@/store";
import { IChecklistItem } from "@/types";



interface CheckListItemModalProps {
  checklistItem: IChecklistItem;
  id: string;
}

const CheckListItemModal = ({ checklistItem, id }: CheckListItemModalProps) => {
  const isModalOpen = useStagairStore((s) => s.commentModal);
  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);
  const setChecklistItemStagiair = useStagairStore((s) => s.setchecklistItemStagiair);

  const [newTitle, setNewTitle] = useState(checklistItem.title);
  const [newDate, setNewDate] = useState(checklistItem.date);

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

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Assuming setChecklistItemStagiair is a mutation function
      await setChecklistItemStagiair({
        id: id,
        title: newTitle,
        date: newDate,
        isChecked: false,
        createdAt: "",
        updatedAt: ""
      });

      handleModalClose();
    } catch (error) {
      console.log("Error updating checklist item:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal duration-0 rounded-md">
      {isModalOpen && (
        <div className="modal-box p-10">
          <h1 className="text-2xl font-semibold mb-5 text-[#002548]">
            Checklist Item
          </h1>
          <form method="dialog" onSubmit={handleSubmitForm} className="">
            <div className="form-control">
              <label className="label text-base mb-5">
                <span className="label-text text-base text-gray-500">
                  Item Title
                </span>
              </label>
              <input
                type="text"
                placeholder="Checklist Item"
                className="w-full p-3 border-2 rounded-md mb-5"
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                value={newDate}
                type="date"
                placeholder="Date"
                className="w-full p-3 border-2 rounded-md mb-5"
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            <div className="w-full text-right mt-2 ">
              <button
                className="mr-4 px-7 py-2 rounded-md bg-gray-200 text-[#002548] font-semibold hover:bg-gray-400"
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
