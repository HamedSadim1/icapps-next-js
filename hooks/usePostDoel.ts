import { IPost } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePost = (post: IPost, stagairId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`http://localhost:3000/api/doelen`, {
        title: post.title,
        body: post.body,
        stagiairID: stagairId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stagair"]);
        console.log("🚀 ~ file: usePostDoel.ts:17 ~ usePost ~ onSuccess:");
      },
      onError: (error) => {
        console.log("🚀 ~ file: usePostDoel.ts:21 ~ usePost ~ error:", error);
      },
    }
  );
  return mutation;
};

export default usePost;
