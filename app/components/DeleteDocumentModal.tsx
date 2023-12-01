"use client";
import { MouseEvent } from "react";
import { BsTrash } from "react-icons/bs";
import useDeleteDocument from "@/hooks/useDeleteDocument";
import { useState } from "react";

interface DeleteDocumentModalProps {
  documentId: string;
}

const DeleteDocumentModal = ({ documentId }: DeleteDocumentModalProps) => {
  const [showDiv, setDiv] = useState(false);
  const { mutate } = useDeleteDocument(documentId);

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await setDiv(false);
    await mutate();
  };

  return (
    <>
      <button onClick={() => setDiv(true)}>
        <BsTrash className="mt-1 text-red-500"></BsTrash>
      </button>
      {showDiv && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50 mt-8 mb-6 ml-2">
          <div className="bg-white shadow-xl w-1/3 h-auto rounded-md flex flex-col items-center mb-16">
            <h2 className="p-5 text-[#002548] text-xl font-semibold">
              Are you sure?
            </h2>
            <div className="flex space-x-4">
              <button
                className="border-2 p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="border-2 p-2 rounded-md text-[#002548] bg-blue-200 hover:bg-blue-300"
                onClick={() => setDiv(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteDocumentModal;
