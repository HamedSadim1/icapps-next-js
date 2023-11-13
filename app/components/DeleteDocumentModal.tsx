"use client";
import { MouseEvent } from "react";
import { BsTrash } from "react-icons/bs";
import useDeleteDocument from "@/hooks/useDeleteDocument";
import { useState } from "react";

interface DeleteDocumentModalProps {
  documentId: string;
}

const DeleteDocumentModal = ({ documentId}: DeleteDocumentModalProps) => {
  const [showDiv, setDiv] = useState(false);
  const { mutate } = useDeleteDocument(documentId);

  const HandleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mutate();
  };

  return (
    <>
      <button onClick={() => setDiv(true)}>
        <BsTrash className="mt-1 text-red-500"></BsTrash>
      </button>
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 bg-gray-900">
          <div className="bg-white shadow-xl w-1/3 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <h1>Are you sure?</h1>
            <button className="border-2" onClick={HandleDelete}>Yes</button>&ensp;
            <button className="border-2" onClick={() => setDiv(false)}>No</button>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteDocumentModal;
