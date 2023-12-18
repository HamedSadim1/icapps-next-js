import { IStagebeschrijving } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useStagebeschrijvingUpdate = (
  id: string,
  stageBeschrijving: IStagebeschrijving
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.patch(
        `http://localhost:3000/api/stagebeschrijving/${id}`,
        {
          beschrijving: stageBeschrijving.beschrijving,
          school: stageBeschrijving.school,
          contactPersoonName: stageBeschrijving.contactPersoonName,
          contactPersoonTelefoon: stageBeschrijving.contactPersoonTelefoon,
          contactPersoonEmail: stageBeschrijving.contactPersoonEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stagair"]);
    
      },
      onError: (error) => {
      
      },
    }
  );
  return mutation;
};

export default useStagebeschrijvingUpdate;
