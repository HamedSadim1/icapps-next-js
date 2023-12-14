import { IChecklistItem, IChecklistSection, checklistSectionStagebegeleider } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


const useChecklistSectionTitleBegeleiderUpdateModal = (id:string,checklist:checklistSectionStagebegeleider) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return axios.patch(
        `http://localhost:3000/api/checkliststagebegeleider/${id}`,
        {
          sectionTitle:checklist.sectionTitle,
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

export default useChecklistSectionTitleBegeleiderUpdateModal;
