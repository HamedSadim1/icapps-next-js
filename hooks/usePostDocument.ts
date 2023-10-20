import { IDocument } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostDocument = (document: IDocument) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/documents`, {
        title: document.title,
        url: document.url,
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
