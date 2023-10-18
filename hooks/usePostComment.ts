import { IComment } from "@/types";
import { useMutation, useQueryClient } from "react-query";

const usePostComment = (data: IComment) => {
  const queryClient = useQueryClient();

  const postComment = async () => {
    const response = await fetch(`http://localhost:3000/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: data.comment,
        postId: data.postId,
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
};

export default usePostComment;
