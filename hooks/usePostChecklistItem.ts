import { IChecklistItem } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const usePostChecklistItem = (
  checklistItem: IChecklistItem,
  checkListSectionId: string
) => {
  console.log("🚀 ~ file: usePostChecklistItem.ts:9 ~ checkListSectionId:", checkListSectionId)
  console.log("🚀 ~ file: usePostChecklistItem.ts:9 ~ checklistItem:", checklistItem)
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`/api/checkliststagiair/checklistItem`, {
        title: checklistItem.title,
        date: "2021-06-01T00:00:00.000Z",
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

export default usePostChecklistItem;
