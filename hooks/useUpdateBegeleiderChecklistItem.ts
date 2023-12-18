import { IChecklistItem } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface UpdateChecklistBegeleiderItemParams {
  id: string;
  isChecked: boolean;
}

const useUpdateBegeleiderChecklistItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, isChecked }: UpdateChecklistBegeleiderItemParams) => {
      return axios.patch(
        `http://localhost:3000/api/checkliststagebegeleider/checklistItemstagebegeleider/${id}`,
        {
          isChecked,
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

export default useUpdateBegeleiderChecklistItem;
