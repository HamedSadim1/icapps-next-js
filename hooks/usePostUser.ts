import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const usePostUser = () => {
  const queryClient = useQueryClient();

  const { data: user } = useSession();
  const session = user?.user;
  const mutation = useMutation(
    () =>
      axios.post("http://localhost:3000/api/users", {
        name: session?.name,
        email: session?.email,
        img: session?.image,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        console.log("🚀 ~ file: usePostUser.ts:23 ~ usePostUser ~ users:");
      },
      onError: (error) => {
        console.log(
          "🚀 ~ file: usePostUser.ts:25 ~ usePostUser ~ error:",
          error
        );
      },
    }
  );

  return mutation;
};

export default usePostUser;
