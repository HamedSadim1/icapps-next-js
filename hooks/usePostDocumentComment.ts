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
      
      },
      onError: (error) => {
       
      },
    }
  );
  return mutation;
};

export default usePostDocumentComment;
