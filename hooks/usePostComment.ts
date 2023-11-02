import { IComment } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const usePostComment = (comment: IComment, postId: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/comments`, {
        comment: comment.comment,
        postId: postId,
        img: session?.user?.image,
        commentatorName: session?.user?.name,
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
