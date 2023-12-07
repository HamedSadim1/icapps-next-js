import { MdClose } from "react-icons/md";
import { useState, useTransition } from "react";
import { IDocument } from "@/types";
import Image from "next/image";
import { formatDate } from "@/lib";
import { BiComment } from "react-icons/bi";
import DeleteDocumentModal from "./DeleteDocumentModal";
import CommentDocument from "./CommentDocument";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";

interface DocumentDetailProps {
  document: IDocument;
  lang: string;
}

const DocumentDetail = ({document,lang}: DocumentDetailProps) => {
  const [showDiv, setDiv] = useState(false);
  const translation = getTranslation(lang as Locale);
  return (
    <>
      <div className="flex flex-col items-start"  key={document.id}>
        <a onClick={() => setDiv(true)}>
          <button>
            <h2 className="text-xl mt-5 text-left ">
              {document.original_filename}{" "}
            </h2>
          </button>
        </a>
        <h3 className="text-gray ml-2 text-gray-400">
          {formatDate(document.created_at)} {translation.detail.by}{" "}
          {document.documentUploaderName} ({document.bytes}
          kb)
        </h3>
        <div className="flex justify-start text-gray-400">
          <BiComment className="mt-1 ml-2" />
          <h3 className="text-gray ml-2 flex">
            {" "}
            {document.comments != undefined
              ? document.comments.length
              : "0"}{" "}
            {translation.detail.comment}
          </h3>
        </div>
      </div>
      <br />
      <hr className="mr-7" />
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-500">
          <div className="bg-white shadow-2xl w-1/3 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl"
              onClick={() => setDiv(false)}
            >
              <MdClose></MdClose>
            </button>
            <div className="flex pt-14 mx-16 ">
              <label
                htmlFor="docKiezen"
                className="w-full text-xl bg-zinc-100 py-3 px-3 text-blue-900 font-medium rounded-md"
              >
                <a
                  href={
                    "https://res.cloudinary.com/dhjblvbsd/image/upload/f_auto,q_auto/" +
                    document.public_id
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="float-left">
                    {" "}
                    {document.original_filename}{" "}
                  </h2>
                </a>
                {/* DELETE DOCUMENT BUTTON */}
                <button className="float-right">
                  <button className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl">
                    <DeleteDocumentModal documentId={document.id} lang={lang} />
                  </button>
                </button>
              </label>
            </div>
            {/* DOCUMENT COMMENTS */}
            <div className="flex flex-col mt-3 mx-6">
  {document.comments != null && document.comments.length > 0 ? (
    document.comments.map((comment) => (
      <div key={comment.id} className="flex items-start mb-3 ml-10">
        {/* Comment Avatar */}
        <div className="avatar w-12 h-12 mr-3">
          {comment.img && (
            <Image
              src={comment.img}
              alt="User avatar"
              className="rounded-full"
              sizes="70%"
              width={100}
              height={100}
            />
          )}
        </div>
        {/* Comment Content */}
        <div className="flex flex-col">
          <h3 className="text-1 xl text-blue-400 mb-1">
            {comment.commentatorName || ""}
          </h3>
          <div className="flex flex-col rounded-lg">
            <p className="text-gray-600 text-base font-medium leading-relaxed">
              {comment.comment}
            </p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>{translation.detail.nocomments}</p>
  )}
</div>



            <CommentDocument lang={lang} />
          </div>
        </div>
      )}
    </>
  );
};
export default DocumentDetail;
