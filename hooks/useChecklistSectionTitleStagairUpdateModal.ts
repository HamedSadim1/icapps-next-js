import { IChecklistItem, IChecklistSection } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


const useChecklistSectionTitleStagairUpdateModal = (id:string,checklist:IChecklistSection) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return axios.patch(
        `http://localhost:3000/api/checkliststagiair/${id}`,
        {
          sectionTitle:checklist.sectionTitle,
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

export default useChecklistSectionTitleStagairUpdateModal;
