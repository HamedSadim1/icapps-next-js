"use client";
import { IDocument } from "@/types";
import useStagairStore from "@/store";
import usePostDocument from "@/hooks/usePostDocument";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";
import ClipLoader from "react-spinners/ClipLoader";

interface IUploadDocumentProps {
  stagiairId: string;
  lang: string;
}

const UploadDocument = ({ stagiairId, lang }: IUploadDocumentProps) => {
  const translation = getTranslation(lang as Locale);
  //? post document to database with usePostDocument hook
  const { mutate } = usePostDocument(stagiairId);
  //? show div state for upload document
  const [showDiv, setDiv] = useState(false);
  //? upload file state for cloudinary upload function
  const [upload, setUpload] = useState<any>();
  //? get session data from next auth session
  const { data: session } = useSession();

  {
    /* POST DOCUMENT TO CLOUDINARY */
  }
  const [spinner, setSpinner] = useState(false);//loading
  const postDocument = async (files: (string | Blob)[]) => {
    setSpinner(true);//loading
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "haezfifr");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dhjblvbsd/image/upload",
        formData
      );
      const response: IDocument = res.data;
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
    setTimeout(() => {
      setDiv(false);
      setSpinner(false);//loading
    }, 7000);
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
      {showDiv == false && (
        <button
          className="text-gray-500 hover:text-gray-900 z-0 mt-3"
          onClick={() => setDiv(true)}
        >
          <AiOutlinePlus className="float-left mt-1 ml-1 text-gray-500" />
          &nbsp;{translation.detail.adddocument}
        </button>
      )}
      {showDiv == true && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-50 bg-gray-700">
          <div className="bg-white shadow-xl h-auto pb-7 xs:mx-5  text-gray-500  rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-6 sm:pb-10 text-[#002548] font-semibold text-2xl flex">
                {translation.detail.adddocument} &nbsp;{" "}
              </h2>
              <div >
                <div className="mb-5">
                  <input
                    className="p-5 bg-gray-200 rounded-md w-full"
                    type="file"
                    onChange={(e) => setUpload(e.target.files)}
                  />
                </div>


                <div className="flex flex-col sm:flex-row justify-end gap-5 w-full">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-50 w-full sm:w-auto text-[#002548] font-semibold hover:bg-blue-200"
                    onClick={() => setDiv(false)}
                  >
                    {translation.detail.cancel}
                  </button>
                  {spinner == true ? //loading

                    <button
                      type="submit"
                      className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500 pointer-events-none"
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

                    <button onClick={() => postDocument(upload)} className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500">
                      {translation.detail.upload}
                    </button>
                    //loading t.e.m hier
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadDocument;
