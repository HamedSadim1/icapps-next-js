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
          date: new Date(checklist.date).toISOString()
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stagair");
        queryClient.invalidateQueries("doelen");
      
      },
      onError: (error) => {
       
      },
    }
  );

  return mutation;
};

export default useCheckListItemUpdateModal;
