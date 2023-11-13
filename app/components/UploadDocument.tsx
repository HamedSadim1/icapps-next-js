"use client";
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import { IDocument } from "@/types";
import useStagairStore from "@/store";
import usePostDocument from "@/hooks/usePostDocument";
import { AiOutlinePlus } from "react-icons/ai";

interface IUploadDocumentProps {
  stagiairId: string;
}

const UploadDocument = ({ stagiairId }: IUploadDocumentProps) => {
  const document = useStagairStore((s) => s.documents);
  const { mutate } = usePostDocument(document, stagiairId);

  const handleOnUpload = async (result: CldUploadWidgetResults) => {
    try {
      if (result.event !== "success") {
        console.log("Upload failed or result.info is a string");
        return;
      }

      const info = result.info as IDocument;

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
        comments: ""
      };

      await useStagairStore.setState({ documents: uploadedDocument });

      await mutate();
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  return (
    <>
      <div className="flex hover:text-gray-900 text-xl text-gray-500 mt-5">
        <AiOutlinePlus className="ml-2 mt-1"></AiOutlinePlus>
        <CldUploadWidget
          uploadPreset="haezfifr"
          onUpload={handleOnUpload}
          options={{
            multiple: false,
            sources: ["local"],
          }}
        >
          {({ open }) => (
            <button onClick={() => open()}>&nbsp;Document toevoegen</button>
          )}
        </CldUploadWidget>
      </div>
    </>
  );
};

export default UploadDocument;
