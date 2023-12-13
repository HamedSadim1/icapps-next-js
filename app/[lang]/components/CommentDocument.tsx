"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { FormEvent, useState } from "react";
import useStagairStore from "@/store";
import usePostDocumentComment from "@/hooks/usePostDocumentComment";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";

interface Props {
  lang: string;
}

const CommentDocument = ({ lang }: Props) => {
  //? show div state for upload document
  const [showDiv, setDiv] = useState<boolean>(false);
  //? get comment from store
  const comment = useStagairStore((s) => s.documentComment);
  //? set comment to store
  const setComment = useStagairStore((s) => s.setDocumentComment);
  //? get document id from store
  const documentId = useStagairStore((s) => s.documentId);
  //? post comment to database with usePostDocumentComment hook
  const { mutate } = usePostDocumentComment(comment, documentId);
//? if there is no comment, return null
  if (!comment) return null;
//? reset the comment to empty string
  const resetComment = () => {
    useStagairStore.setState((state) => ({
      ...state,
      documentComment: {
        comment: "",
        commentatorName: "",
        createdAt: "",
        documentId: "",
        img: "",
        id: "",
      },
    }));
  };
  
  //? handle submit button
  const handleSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //? post comment to database
    mutate();
       // reset the comment
       resetComment()
    
    setDiv(false);

  };

  const handleCloseCommentaar = () => {

      // reset the comment
      resetComment()  
        
    setDiv(false);
  };

  const translation = getTranslation(lang as Locale);

  if (typeof window !== "undefined") { // close image if escape is pressed
    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key == "Escape") {
          setDiv(false);

        }
    })

}

  return (
    <>
      {showDiv == false && (
        <div className="bg-white text-gray-500 hover:text-gray-900 border-none pl-1 float-left ml-24 mt-2 cursor-pointer">
          <button onClick={() => setDiv(true)}>
            <AiOutlinePlus className="float-left ml-3 mt-1 text-gray-500 hover:text-gray-900" />
            &nbsp;{translation.detail.addcomment}
          </button>
        </div>
      )}
      {showDiv == true && (
        <div className="ml-28 mb-16 h-12">
          <form
            className="absolute flex flex-col items-end"
            onSubmit={handleSubmitButton}
          >
            <textarea
              rows={2}
              className="mb-4 border-2 p-1 rounded-md pointer-events-auto w-96"
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
                className="ml-4 px-6 py-1 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500"
              >
                {translation.detail.post}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CommentDocument;
