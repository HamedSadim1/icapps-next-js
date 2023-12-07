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
  const [showDiv, setDiv] = useState<boolean>(false);
  const comment = useStagairStore((s) => s.documentComment);
  const setComment = useStagairStore((s) => s.setDocumentComment);
  const documentId = useStagairStore((s) => s.documentId);

  const { mutate } = usePostDocumentComment(comment, documentId);

  if (!comment) return null;

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
  

  const handleSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  return (
    <>
      {showDiv == false && (
        <div className="bg-white text-gray-500 hover:text-gray-900 border-none pl-1 ml-12 mt-2">
          <button onClick={() => setDiv(true)}>
            <AiOutlinePlus className="float-left ml-3 mt-1 text-gray-700" />
            &nbsp;{translation.detail.addcomment}
          </button>
        </div>
      )}
      {showDiv == true && (
        <div className="ml-16 mb-16 h-12">
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
                className="ml-4 px-6 py-1 rounded-md bg-blue-100 text-[#002548] font-semibold hover:bg-blue-200"
                onClick={handleCloseCommentaar}
              >
                {translation.detail.cancel}
              </button>
              <button
                type="submit"
                className="ml-4 px-6 py-1 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500 "
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
