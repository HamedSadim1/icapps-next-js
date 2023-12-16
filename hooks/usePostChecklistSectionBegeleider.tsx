import { IChecklistSection, checklistSectionStagebegeleider } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


interface UsePostChecklistBegProps{
  stagairId:string
}
const usePostChecklistSectionBegeleider =({ stagairId }: UsePostChecklistBegProps) => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation(
    (sectionData: checklistSectionStagebegeleider) => {
      return axios.post(`/api/checkliststagebegeleider`, {
        sectionTitle: sectionData.sectionTitle,
        stagiairID: stagairId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["checklist"]);
        queryClient.invalidateQueries(["stagair"]);
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );

  return mutation;
};

export default usePostChecklistSectionBegeleider;
