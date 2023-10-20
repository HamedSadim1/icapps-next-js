import { IDocument } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostDocument = (document: IDocument, stagiairId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/documents`, {
        title: document.title,
        url: document.url,
        stagiairID: stagiairId,
        size: document.size,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("documents");
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
