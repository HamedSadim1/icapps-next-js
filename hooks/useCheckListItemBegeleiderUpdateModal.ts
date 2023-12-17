import { ICheckListItemStagebegeleider} from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


const useCheckListItemBegeleiderUpdateModal = (id:string,checklist:ICheckListItemStagebegeleider) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.patch(
        `http://localhost:3000/api/checkliststagebegeleider/checklistItemstagebegeleider/${id}`,
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
        console.error("Mutation error:", error);
      },
    }
  );

  return mutation;
};

export default useCheckListItemBegeleiderUpdateModal;
