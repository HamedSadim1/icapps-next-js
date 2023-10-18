import { IPost } from "@/types";
import { useMutation, useQueryClient } from "react-query";

const usePost = (post: IPost, stagairId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return fetch(`http://localhost:3000/api/doelen`, {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          body: post.body,
          stagiairID: stagairId,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok");
        }
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

export default usePost;
