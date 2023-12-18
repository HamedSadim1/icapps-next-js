import { useMutation, useQueryClient } from "react-query";

const useDeletePost = (postId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return fetch(`http://localhost:3000/api/doelen/${postId}`, {
        method: "DELETE",
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
 
      },
      onError: (error) => {
    
      },
    }
  );
  return mutation;
};

export default useDeletePost;
