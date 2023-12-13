import { useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { IStagaireResponse } from "@/types";

export const useGetAllStagiaire = (
  search: string,
  page: number
) => {
  const queryClient = useQueryClient();

  return useQuery<IStagaireResponse>(
    ["overzicht", search, page],
    async () => {
      const { data } = await axios.get(
        `/api/users/stagiair`,({params: { name:search , page }})
      );
     
      return data;
    },

    {
      keepPreviousData: true,

      onSuccess: (data) => {
        queryClient.setQueryData<IStagaireResponse>(
          ["overzicht", search, page],
          data
        );
      },
    }
  );
};
