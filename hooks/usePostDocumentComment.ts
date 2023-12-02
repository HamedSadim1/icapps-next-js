import {  IDocumentComment } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const usePostDocumentComment = (comment: IDocumentComment, postId: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return axios.post(`/api/documentComments`, {
        comment: comment.comment,
        documentID: postId,
        img: session?.user?.image,
        commentatorName: session?.user?.name,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stagair");
        console.log("Variables:", mutation.context);
        console.log("Variables:", mutation.data);
        console.log("Variables:", mutation.isSuccess);
        console.log("Status:", mutation.status);
        console.log("Mutation succes");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );
  return mutation;
};

export default usePostDocumentComment;
