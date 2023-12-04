"use client";
import { IDocument } from "@/types";
import useStagairStore from "@/store";
import usePostDocument from "@/hooks/usePostDocument";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";

interface IUploadDocumentProps {
  stagiairId: string;
}

const UploadDocument = ({ stagiairId }: IUploadDocumentProps) => {
  // const document = useStagairStore((s) => s.documents);
  const { mutate,isLoading } = usePostDocument(stagiairId);
  const [showDiv, setDiv] = useState(false);
  const [upload, setUpload] = useState<any>();
  const { data: session } = useSession();

  {
    /* POST DOCUMENT TO CLOUDINARY */
  }
  const postDocument = async (files: (string | Blob)[]) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "haezfifr");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dhjblvbsd/image/upload",
        formData
      );
      const response :IDocument = res.data 
      console.log(response);
      if (session && session.user && session.user.name && session.user.image) {
        const uploadedDocument: IDocument = {
          id: response.public_id,
          original_filename: response.original_filename,
          url: response.url,
          secure_url: response.secure_url,
          public_id: response.public_id,
          created_at: response.created_at,
          stagiairID: stagiairId,
          bytes: response.bytes,
          resource_type: response.resource_type,
          documentUploaderName: session.user.name,
          img: session.user?.image,
        };
       mutate(uploadedDocument);
      }
      
   
    } catch (error) {
      console.error(error);
    }
  };

  {
    /* SAVE CLOUDINARY RESPONSE IN DATABASE */
  }
  // const handleOnUpload = async (document: IDocument) => {
  //   try {
  //     if (session && session.user && session.user.name && session.user.image) {
  //       const uploadedDocument: IDocument = {
  //         id: document.public_id,
  //         original_filename: document.original_filename,
  //         url: document.url,
  //         secure_url: document.secure_url,
  //         public_id: document.public_id,
  //         created_at: document.created_at,
  //         stagiairID: document.stagiairID,
  //         bytes: document.bytes,
  //         resource_type: document.resource_type,
  //         comments: document.comments,
  //         documentUploaderName: session.user.name,
  //         img: session.user?.image,
  //       };
  //       useStagairStore.setState({ documents: uploadedDocument });
  //     }

  //     // mutate();
  //   } catch (error) {
  //     console.error("Mutation error:", error);
  //   }
  // };

  const handleCloseModal= () => {
    if(!isLoading){
      setDiv(false)
    }
  }

  return (
    <>
      <>
        {showDiv == false && (
          <button
            className="text-gray-500 hover:text-gray-900 z-0 mt-3"
            onClick={() => setDiv(true)}
          >
            <AiOutlinePlus className="float-left mt-1 ml-1 text-gray-500" />
            &nbsp;Document toevoegen
          </button>
        )}
        {showDiv == true && (
          <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
            <div className="bg-white shadow-2xl w-1/4 h-auto pb-7 text-gray-500 z-2 rounded-md">
              <button
                className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl"
                onClick={() => setDiv(false)}
              >
                <MdClose></MdClose>
              </button>

              <div className="flex pt-16 pb-10 ml-14 ">
                <input
                  className="p-5 bg-gray-200 rounded-md"
                  type="file"
                  onChange={(e) => setUpload(e.target.files)}
                />
              </div>
              <div className="w-full text-right">
                <button
                  className="mr-4 px-7 py-2 rounded-md bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                  onClick={() => setDiv(false)}
                >
                  Annuleren
                </button>
                <a
                  className="mr-16 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500 px-7 py-2 cursor-pointer"
                  onClick={() => setDiv(false)}
                >
                  <button onClick={() => postDocument(upload)}>
                    {isLoading ? "Uploading" :"Upload"}
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default UploadDocument;
