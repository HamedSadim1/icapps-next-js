import { IStagebeschrijving } from "@/types";
import { useMutation, useQueryClient } from "react-query";

export const usePostStagebeschrijving = (
  stagebeschrijving: IStagebeschrijving,
  stagairId: string
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return fetch(`http://localhost:3000/api/stagebeschrijvingen`, {
        method: "POST",
        body: JSON.stringify({
          school: stagebeschrijving.school,
          beschrijving: stagebeschrijving.beschrijving,
          stagiairID: stagairId,
          contactPersoonEmail: stagebeschrijving.contactPersoonEmail,
          contactPersoonName: stagebeschrijving.contactPersoonName,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok");
        }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stagebeschrijving");
        console.log("Mutation succes");
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );
  return mutation;
};
