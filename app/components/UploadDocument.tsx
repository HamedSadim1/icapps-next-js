"use client";
import { IDocument } from "@/types";
import useStagairStore from "@/store";
import usePostDocument from "@/hooks/usePostDocument";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

interface IUploadDocumentProps {
  stagiairId: string;
}

const UploadDocument = ({ stagiairId }: IUploadDocumentProps) => {
  const document = useStagairStore((s) => s.documents);
  const { mutate } = usePostDocument(document, stagiairId);
  const [showDiv, setDiv] = useState(false);
  const [upload,setUpload] = useState<any>();
  
  { /* POST DOCUMENT TO CLOUDINARY */ }
  const postDocument = (files: (string | Blob)[]) => {
    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("upload_preset","haezfifr")

    axios.post("https://api.cloudinary.com/v1_1/dhjblvbsd/image/upload", formData).then((response) => handleOnUpload(response.data));
  }

  { /* SAVE CLOUDINARY RESPONSE IN DATABASE */ }
  const handleOnUpload = async (result) => {
    try {

      const info = result as IDocument;

      const uploadedDocument: IDocument = {
        id: info.public_id,
        original_filename: info.original_filename,
        url: info.url,
        secure_url: info.secure_url,
        public_id: info.public_id,
        created_at: info.created_at,
        stagiairID: info.stagiairID,
        bytes: info.bytes,
        resource_type: info.resource_type,
        comments: info.comments
      };

      await useStagairStore.setState({ documents: uploadedDocument });

      await mutate();
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  return (
    <>
      <>
        {showDiv == false &&
          <button className="text-gray-500 hover:text-gray-900 z-0" onClick={() => setDiv(true)}>&nbsp;Document toevoegen</button>
        }{showDiv == true &&
          <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 bg-gray-900">
            <div className="bg-white shadow-xl w-1/3 h-auto pb-7 text-gray-500 z-2 rounded-md">
              <button className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl" onClick={() => setDiv(false)}><MdClose></MdClose></button>
              <div className="flex pt-16 mx-16">
                <input className="bg-cyan-600" type="file" onChange={(e) => setUpload(e.target.files)}/>
              </div>
              <a onClick={() => setDiv(false)}><button onClick={() => postDocument(upload)}>Upload</button></a>
            </div>
          </div>
        }
      </>
    </>
  );
};

export default UploadDocument;
