import { IChecklistSection } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostChecklistStagiair = (
  checklistStagiair: IChecklistSection,
  stagiairId: string
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/checkliststagiair`, {
        checklistStagiair,
        stagiairId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stagair"]);
      
      },
      onError: (error) => {
        
      },
    }
  );
  return mutation;
};

export default usePostChecklistStagiair;
