"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FormEvent, useState } from "react";
import { GoGoal } from "react-icons/go";
import useStagairStore from "@/store";
import usePostComment from "@/hooks/usePostComment";

const CommentModal = () => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const comment = useStagairStore((s) => s.comment);
  const setComment = useStagairStore((s) => s.setComment);

  const commentId = useStagairStore((s) => s.commentId);

  const { mutate, data } = usePostComment(comment!, commentId);

  if (!comment) return null;

  const handleSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate();
    setDiv(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <GoGoal className="text-3xl text-blue-500 mr-4 mb-1" />
          <h2 className="font-bold text-2xl mb-1">Doelen</h2>
        </div>
        <div className="flex px-4 py-2 text-blue-900 font-semibold bg-gray-200 rounded-md hover:bg-gray-300">
          <button onClick={() => setDiv(true)}>
            <AiOutlinePlus className="float-left mt-1" />
            &nbsp;Nieuw Comment
          </button>
        </div>
      </div>
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 bg-gray-900">
          <div className="bg-white shadow-xl w-4/10 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-blue-900 font-semibold text-2xl flex">
                comment &nbsp;
              </h2>
              <form onSubmit={handleSubmitButton}>
                <label htmlFor="beschrijving">Beschrijving</label>
                <textarea
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="beschrijving"
                  id="beschrijving"
                  value={comment.comment}
                  onChange={(e) =>
                    setComment({ ...comment, comment: e.target.value })
                  }
                ></textarea>
                <br />
                <div className="w-full text-right">
                  <button
                    className="mr-2 px-7 py-2 rounded-md bg-gray-200 text-blue-900 font-semibold"
                    onClick={() => setDiv(false)}
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2 rounded-md bg-blue-900 text-white font-semibold"
                  >
                    Opslaan
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

export default CommentModal;
