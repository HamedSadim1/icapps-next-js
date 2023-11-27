import { IChecklistItem } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


const usePostChecklistItem =(checklist:IChecklistItem,id:string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios
        .patch(`http://localhost:3000/api/checkliststagiair/checklistItem/${id}`, {
        checklist
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          } else {
            throw new Error("Network response was not ok");
          }
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stagair");
        queryClient.invalidateQueries("doelen");
        console.log("Mutation succes");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );
  return mutation;
};

export default usePostChecklistItem
