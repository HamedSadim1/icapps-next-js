import { IDocument } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostDocument = (document: IDocument, stagiairId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/document`, {
        original_filename: document.original_filename,
        url: document.url,
        secure_url: document.secure_url,
        public_id: document.public_id,
        created_at: document.created_at,
        stagiairID: stagiairId,
        bytes: document.bytes,
        resource_type: document.resource_type,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stagair"]);
        console.log("Mutation succes");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );
  return mutation;
};

export default usePostDocument;
