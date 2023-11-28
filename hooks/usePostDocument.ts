import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { IDocument } from "@/types";

const usePostDocument = (stagiairId: string) => {
  const queryClient = useQueryClient();

  const postDocument = async (document: IDocument) => {
    try {
      const response = await axios.post(`/api/document`, {
        original_filename: document.original_filename,
        url: document.url,
        secure_url: document.secure_url,
        public_id: document.public_id,
        created_at: document.created_at,
        stagiairID: stagiairId,
        bytes: document.bytes,
        resource_type: document.resource_type,
        img: document.img,
        documentUploaderName: document.documentUploaderName,
      });

      return response.data; // You can return any data from the response if needed
    } catch (error) {
      throw error; // Propagate the error for better handling in the mutation
    }
  };

  const mutation = useMutation(postDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stagair"]);
      console.log("Mutation success");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return mutation;
};

export default usePostDocument;
