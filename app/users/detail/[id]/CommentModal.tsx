import useStagairStore from "@/store";
import { useEffect, MouseEvent } from "react";

interface CommentModalProps {
  id: string;
}

const CommentModal = ({ id }: CommentModalProps) => {
  const isModalOpen = useStagairStore((s) => s.commentModal);

  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);

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

  const handleModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <dialog id="my_modal_3" className="modal">
      {isModalOpen && (
        <div className="modal-box">
          <h1 className="text-2xl mb-3">Stage Detail</h1>
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleModal}
            >
              ✕
            </button>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Beschrijving</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered textarea-info"
                placeholder="beschrijving"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stage begeleider(s)</span>
              </label>
              <select className="select select-bordered select-info w-full">
                <option>Stagebegeleider 1</option>
                <option>Stagebegeleider 2</option>
                <option>Stagebegeleider 3</option>
              </select>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default CommentModal;
