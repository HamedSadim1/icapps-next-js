import { IChecklistStagiair } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostChecklistStagiair = (
  checklistStagiair: IChecklistStagiair,
  stagiairId: string
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/checkliststagiair`, {
        title: checklistStagiair.title,
        body: checklistStagiair.body,
        isChecked: checklistStagiair.isChecked,
        stagiairID: stagiairId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("checkliststagiair");
        console.log("Mutation succes");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );
  return mutation;
};

export default usePostChecklistStagiair;
