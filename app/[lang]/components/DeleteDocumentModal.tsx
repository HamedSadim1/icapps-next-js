"use client";
import { MouseEvent } from "react";
import { BsTrash } from "react-icons/bs";
import useDeleteDocument from "@/hooks/useDeleteDocument";
import { useState } from "react";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";
import { ClipLoader } from "react-spinners";

interface DeleteDocumentModalProps {
  documentId: string;
  lang: string;
}

const DeleteDocumentModal = ({ documentId, lang }: DeleteDocumentModalProps) => {
  const translation = getTranslation(lang as Locale);
  const [showDiv, setDiv] = useState(false);
  const { mutate } = useDeleteDocument(documentId);
  const [spinner, setSpinner] = useState(false);//loading

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setSpinner(true);//loading
      mutate();
      setTimeout(() => {
        setDiv(false);
        setSpinner(false);//loading
      }, 7000);
    } catch (error) {
      console.log(error);
    }

  };
  if (typeof window !== "undefined") { // close image if escape is pressed
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setDiv(false);

      }
    })

  }
  return (
    <>
      <button onClick={() => setDiv(true)}>
        <BsTrash className="mt-1 text-red-400 hover:text-red-600"></BsTrash>
      </button>
      {showDiv && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 cursor-auto">
          <div className="bg-white shadow-xl w-1/5 h-auto rounded-md flex flex-col items-center mb-16">
            <h2 className="p-5 text-[#002548] text-xl font-semibold">
              {translation.detail.areyousure}
            </h2>
            <div className="flex space-x-4 mb-6">
              {spinner == true ?
                <button
                  className="p-2 rounded-md text-white bg-red-400 hover:bg-red-600 pointer-events-none"
                >
                  <ClipLoader
                    color={"#ffffff"}
                    loading={true}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </button>
                :
                <button
                  className="p-2 rounded-md text-white bg-red-400 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  {translation.detail.yes}
                </button>
              }
              <button
                className="p-2 rounded-md text-[#002548] bg-blue-50 hover:bg-blue-200"
                onClick={() => setDiv(false)}
              >
                {translation.detail.no}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteDocumentModal;
