import { MdClose } from "react-icons/md";
import { useState } from "react";
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

const DocumentDetail = ({ document, lang }: DocumentDetailProps) => {
  const [showDiv, setDiv] = useState(false);
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
      <div className="flex flex-col text-left hover:opacity-75 w-full break-words" onClick={() => setDiv(true)} key={document.id}>
        <a>
          <button>
            <h2 className="mt-5 ml-2 text-lg sm:text-xl break-words">
              {document.original_filename}
            </h2>
          </button>
        </a>
        <h3 className="flex text-lg sm:text-xl text-gray ml-2 text-gray-400 text-left break-words">
          {formatDate(document.created_at)} {translation.detail.by}{" "}
          {document.documentUploaderName} ({document.bytes}
          kb)
        </h3>
        <div className="flex justify-start text-gray-400 text-left">
          <BiComment className="mt-1 ml-2" />
          <h3 className="text-gray ml-2 flex">
            {" "}
            {document.comments != undefined
              ? document.comments.length
              : "0"}{" "}
            {translation.detail.comment}s
          </h3>
        </div>
      </div>
      <br />
      <hr className="mr-7 w-full" />
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center cursor-auto items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-500">
          <div className="bg-white shadow-xl h-auto  pb-7 mx-5 text-gray-500 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </button>
            <div className="flex flex-col justify-start gap-3 pt-14 mx-5 ">
              <label
                htmlFor="docKiezen"
                className="w-full text-xl bg-[#F9FAFC] py-3 px-3 text-blue-900 font-medium rounded-md"
              >
                <a
                  href={
                    "https://res.cloudinary.com/dhjblvbsd/image/upload/f_auto,q_auto/" +
                    document.public_id
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  <h2 className="float-left">
                    {" "}
                    {document.original_filename}{" "}
                  </h2>
                </a>
                {/* DELETE DOCUMENT BUTTON */}
                <button className="float-right">
                  <button className="btn btn-sm btn-circle btn-ghost float-right my-1 mr-3 text-xl">
                    <DeleteDocumentModal documentId={document.id} lang={lang} />
                  </button>
                </button>
              </label>
            </div>
            {/* DOCUMENT COMMENTS */}
            <div className="flex flex-col mt-3 ">
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
                    <div className="">
                      <h3 className="text-1 xl text-blue-400 mb-1 mr-4">
                        {comment.commentatorName || ""}
                      </h3>
                      <p className="text-gray-600 text-base float-left font-medium leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-5 pb-5 flex mx-6">{translation.detail.nocomments}</p>)}

            </div>

            {/* Comment Modal */}

            <CommentDocument lang={lang} />
          </div>
        </div>
      )}
    </>
  );
};
export default DocumentDetail;
