"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FormEvent, useState } from "react";
import useStagairStore from "@/store";
import usePostComment from "@/hooks/usePostComment";

const CommentModal = () => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const comment = useStagairStore((s) => s.comment);
  const setComment = useStagairStore((s) => s.setComment);
  const commentId = useStagairStore((s) => s.commentId);

  const { mutate } = usePostComment(comment!, commentId);

  if (!comment) return null;

  const handleSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate();
    setDiv(false);
  };

  return (
    <>
      <div className="bg-white text-gray-500 hover:text-gray-900 border-none pl-1 ml-10 mt-2">
        <button onClick={() => setDiv(true)}>
          <AiOutlinePlus className="float-left mt-1 text-gray-700" />
          &nbsp;Commentaar toevoegen
        </button>
      </div>

      {showDiv == true && (
        <div className="flex flex-col justify-end p-28 items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white shadow-xl h-auto pb-7 text-gray-500 z-2 rounded-md">
            <div
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </div>
            <div className="flex flex-col pt-10 mx-16">
              <form onSubmit={handleSubmitButton}>
                <label className="float-left" htmlFor="beschrijving">
                  Commentaar
                </label>
                <input type="text"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="beschrijving"
                  id="beschrijving"
                  value={comment.comment}
                  onChange={(e) =>
                    setComment({ ...comment, comment: e.target.value })
                  }
                ></input>
                <br />
                <div className="w-full text-right">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-gray-200 text-[#002548] font-semibold hover:bg-gray-400"
                    onClick={() => setDiv(false)}
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500"
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
