import { IComment } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostComment = (comment: IComment, postId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/comments`, {
        comment: comment.comment,
        postId: postId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stagair");
        console.log("Mutation succes");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );
  return mutation;
};

export default usePostComment;