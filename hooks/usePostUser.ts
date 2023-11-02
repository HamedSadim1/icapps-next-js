import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import {Session} from "next-auth"

const usePostUser = (session:Session) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () =>
      axios.post("http://localhost:3000/api/users", {
        name: session?.user?.name,
        email: session?.user?.email,
        img: session?.user?.image,
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

  return mutation
};

export default usePostUser;
