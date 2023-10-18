import { useMutation, useQueryClient } from "react-query";
import { IPost } from "../types";
import axios from "axios";

const useUpdatePost = (doel: IPost) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios
        .patch(`http://localhost:3000/api/doelen/${doel.id}`, {
          title: doel.title,
          body: doel.body,
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
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

export default useUpdatePost;
