import { IChecklistSection } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
interface UsePostChecklistProps{
  stagairId:string
}
const usePostChecklistSection = ({ stagairId }: UsePostChecklistProps)=> {
  const queryClient = useQueryClient();
  
  const mutation = useMutation(
    (sectionData: IChecklistSection) => {
      return axios.post(`/api/checkliststagiair`, {
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

export default usePostChecklistSection;
