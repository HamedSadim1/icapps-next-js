"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FormEvent, useState } from "react";
import useStagairStore from "@/store";
import usePostComment from "@/hooks/usePostComment";
import useOneSignalNotification from "@/hooks/useOneSignalNotification";
import usePostNotification from "@/hooks/usePostNotification";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";
interface commentProps {
  lang: string
}

const CommentModal = ({lang}:commentProps) => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const comment = useStagairStore((s) => s.comment);
  const setComment = useStagairStore((s) => s.setComment);
  const commentId = useStagairStore((s) => s.commentId);
  const pushNotificationId = useStagairStore((s) => s.pushNotificationId);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // New state

  const { mutate, status } = usePostComment(comment!, commentId);
  const { mutate: mutateNotification } =
    usePostNotification(pushNotificationId);

  useOneSignalNotification();

  if (!comment) return null;

  const resetComment = () => {
    useStagairStore.setState((state) => ({
      ...state,
      comment: {
        id: "",
        postId: "",
        createdAt: "",
        commentatorName: "",
        comment: "",
      },
    }));
  };
  

  const handleSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutate();
      setDiv(false);

      console.log("not" + status);
      if (status === "success") {
        console.log("succes" + status);
        // Reset Zustand state by setting the state to the initial values
        resetComment();
        
      }
      await mutateNotification({
        include_player_ids: [pushNotificationId],
        headings: { en: "New Comment", nl: "Nieuw Commentaar" },
        contents: {
          en: "A new comment has been added",
          nl: "Er is een nieuw commentaar toegevoegd",
        },
      });
    } finally {
      setIsSubmitting(false);
    }

    if (isSubmitting) {
      // If already submitting, do nothing
      return;
    }
  };

  const handleOpenCommentaar = () => {
    setDiv(true);
    // Reset Zustand state by setting the state to the initial values
    resetComment();
  };

  const handleCloseCommentaar = () => {
    setDiv(false);
  };

  const translation = getTranslation(lang as Locale)
  if (typeof window !== "undefined") { // close image if escape is pressed
    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key == "Escape") {
          setDiv(false);

        }
    })

}

  return (
    <>
      {showDiv === false && (
        <div className="ml-16 flex px-4 py-2 text-gray-500 hover:text-gray-900">
          <button onClick={handleOpenCommentaar} disabled={isSubmitting}>
            <AiOutlinePlus className="float-left mt-1 text-gray-500 hover:text-gray-900" />
            &nbsp;{translation.detail.addcomment}
          </button>
        </div>
      )}
      {showDiv == true && (
        <div className="ml-16 mb-16">
          <form
            className="absolute flex items-end"
            onSubmit={handleSubmitButton}
          >
            <textarea
              cols={50}
              rows={2}
              className="ml-4 border-2 p-1 rounded-md pointer-events-auto"
              name="beschrijving"
              id="beschrijving"
              value={comment.comment}
              onChange={(e) =>
                setComment({ ...comment, comment: e.target.value })
              }
            ></textarea>
            <div className=" pointer-events-auto">
              <button
                className="ml-4 px-6 py-1 rounded-md bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                onClick={handleCloseCommentaar}
              >
                                {translation.detail.cancel}

              </button>
              <button
                type="submit"
                className={`ml-4 px-6 py-1 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500${
                  comment.comment.length < 4
                    ? "cursor-not-allowed"
                    : ""
                }`}
                disabled={comment.comment.length < 4 || isSubmitting}
              >
                {translation.detail.post}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* {showDiv == true && (
        <div className=" pointer-events-none h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white shadow-2xl h-auto pb-7 text-gray-500 z-2 rounded-md">
            <div
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3 pointer-events-auto"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </div>
            <div className="flex flex-col pt-16 mx-16">
              <form onSubmit={handleSubmitButton}>
                <label className="float-left" htmlFor="beschrijving">
                  Commentaar
                </label>
                <textarea
                  className="w-full p-3 border-2 rounded-md mb-5 pointer-events-auto"
                  name="beschrijving"
                  id="beschrijving"
                  value={comment.comment}
                  onChange={(e) =>
                    setComment({ ...comment, comment: e.target.value })
                  }
                ></textarea>
                <br />
                <div className="w-full text-right pointer-events-auto">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-100 text-[#002548] font-semibold hover:bg-blue-200"
                    onClick={() => setDiv(false)}
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500"
                  >
                    Plaatsen
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CommentModal;
