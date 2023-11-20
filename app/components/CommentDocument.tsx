"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FormEvent, useState } from "react";
import useStagairStore from "@/store";
import usePostComment from "@/hooks/usePostComment";

const CommentDocument = () => {
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
    <>{showDiv == false &&
      <div className="bg-white text-gray-500 hover:text-gray-900 border-none pl-1 ml-12 mt-2">
        <button onClick={() => setDiv(true)}>
          <AiOutlinePlus className="float-left ml-3 mt-1 text-gray-700" />
          &nbsp;Commentaar toevoegen
        </button>
      </div>
}
      {showDiv == true &&
      <div className="ml-16 mb-16 h-12">
        <form className="absolute flex flex-col items-end" onSubmit={handleSubmitButton}>
          <textarea cols={58} rows={2}
            className="mb-4 border-2 p-1 rounded-md pointer-events-auto"
            name="beschrijving"
            id="beschrijving"
            value={comment.comment}
            onChange={(e) =>
              setComment({ ...comment, comment: e.target.value })
            }
          ></textarea>
          <div className=" pointer-events-auto">
            <button
              className="ml-4 px-6 py-1 rounded-md bg-blue-100 text-[#002548] font-semibold hover:bg-blue-200"
              onClick={() => setDiv(false)}
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="ml-4 px-6 py-1 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500 "
            >
              Plaatsen
            </button>
          </div>
        </form>
        </div>
      }
    </>
  );
};

export default CommentDocument;
