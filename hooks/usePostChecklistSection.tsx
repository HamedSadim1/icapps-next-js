import { IChecklistSection } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostChecklistSection = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation(
    (sectionData: IChecklistSection) => {
      return axios.post(`/api/checkliststagiair`, {
        sectionTitle: sectionData.sectionTitle,
        stagiairID: sectionData.stagiairID,
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
