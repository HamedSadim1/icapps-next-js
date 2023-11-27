import { IChecklistItem } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface UpdateChecklistItemParams {
  id: string;
  isChecked: boolean;
}

const useUpdateChecklistItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, isChecked }: UpdateChecklistItemParams) => {
      return axios.patch(
        `http://localhost:3000/api/checkliststagiair/checklistItem/${id}`,
        {
          isChecked,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stagair");
        queryClient.invalidateQueries("doelen");
        console.log("Mutation success");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );

  return mutation;
};

export default useUpdateChecklistItem;
