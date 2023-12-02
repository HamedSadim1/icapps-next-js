import { IChecklistItem } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


const useCheckListItemUpdateModal = (id:string,checklist:IChecklistItem) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return axios.patch(
        `http://localhost:3000/api/checkliststagiair/checklistItem/${id}`,
        {
          title:checklist.title,
          date:checklist.date,
        
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

export default useCheckListItemUpdateModal;
