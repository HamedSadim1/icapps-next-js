import { FaRegCircleUser } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { IDocument, IStagaire } from "@/types";
import { formatDate } from "@/lib";
import useStagair from "@/hooks/useStagair";
import { BiComment } from "react-icons/bi";
import { BsFillTrashFill, BsTypeH1 } from "react-icons/bs";
import useDeleteDocument from "@/hooks/useDeleteDocument";
import DeleteDocumentModal from "./DeleteDocumentModal";
import CommentDocument from "./CommentDocument";

interface DocumentDetailProps {
  document: IDocument
}

const DocumentDetail = (document: DocumentDetailProps) => {
  const user = useStagair(document.document.stagiairID);
  const [showDiv, setDiv] = useState(false);
  const [docText, setDocText] = useState("Bestand kiezen");
  const date = new Date();

  return (
    <>
      <div key={document.document.id}>
        <a onClick={() => setDiv(true)}>
          <button><h2 className="text-xl mt-5 ml-2"> {document.document.original_filename} </h2></button>
        </a>
        <h3 className="text-gray ml-2 text-gray-400">
          {formatDate(document.document.created_at)} door {user.data?.name} (
          {document.document.bytes}
          kb)
        </h3>
        <div className="flex justify-start text-gray-400">
          <BiComment className="mt-1 ml-2" />
          <h3 className="text-gray ml-2 flex"> {(document.document.comments) != undefined ? document.document.comments.length : "0"} comments</h3>
        </div>
      </div>
      <br />
      <hr className="mr-7"/>
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-500">
          <div className="bg-white shadow-2xl w-1/3 h-auto pb-7 text-gray-500 z-2 rounded-md">

            <button
              className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl"
              onClick={() => setDiv(false)}
            >
              <MdClose></MdClose>
            </button>
            <div className="flex pt-14 mx-16">
              <label
                htmlFor="docKiezen"
                className="w-full text-xl bg-zinc-100 py-3 px-3 text-blue-900 font-medium rounded-md"
              >
                <a href={"https://res.cloudinary.com/dhjblvbsd/image/upload/f_auto,q_auto/" + document.document.public_id} target="_blank" rel="noopener noreferrer" >
                  <h2 className="float-left"> {document.document.original_filename} </h2>
                </a>
                {/* DELETE DOCUMENT BUTTON */}
                <button className="float-right">
                  <DeleteDocumentModal documentId={document.document.id} />
                </button>
              </label>
            </div>
            {/* FOR LOOP ALLE COMMENTS VAN DOCUMENT EN DISPLAY DIT MET JUISTE INFO */}
            {/* ------------------------------------------------------------------ */}

            <div className="mx-6 pt-5">
              <FaRegCircleUser className="text-cyan-600 text-3xl float-left w-8 h-16"></FaRegCircleUser>
              <b className="text-cyan-600 ml-4 text-sm font-semibold">
                Steve Jobs
              </b>
              <p className="text-blue-900 pl-12 mr-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit.{" "}
              </p>
            </div>
            {/*  ------------------------------------------------------------------ */}
            <CommentDocument />
          </div>
        </div>
      )}
    </>
  );
};
export default DocumentDetail;
