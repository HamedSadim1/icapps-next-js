import { ICheckListItemStagebegeleider, IChecklistItem } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostChecklistItemBegleider = (
  checklistItem: ICheckListItemStagebegeleider,
  checkListSectionId: string
) => {
  console.log("🚀 ~ file: usePostChecklistItem.ts:9 ~ checkListSectionId:", checkListSectionId)
  console.log("🚀 ~ file: usePostChecklistItem.ts:9 ~ checklistItem:", checklistItem)
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/checkliststagebegeleider/checklistItemstagebegeleider`, {
        title: checklistItem.title,
        date: new Date(checklistItem.date).toISOString(),
        checklistItemSectionID: checkListSectionId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["checklist"]);
        queryClient.invalidateQueries(["stagair"]);
        console.log("Mutation succes");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );
  return mutation;
};

export default usePostChecklistItemBegleider;
