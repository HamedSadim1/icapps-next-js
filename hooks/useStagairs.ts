import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IStagaire } from "@/types";

const apiClient = new APIClient<IStagaire>("/stagebegeleiderRole");

const useStagairs = (): UseQueryResult<IStagaire[], Error> => {
  const queryFn = async (): Promise<IStagaire[]> => {
    const response = await apiClient.getAll();
 
    return response;
  };

  const options: UseQueryOptions<IStagaire[], Error> = {
    queryKey: ["stagairs"],
    queryFn,
  };

  return useQuery<IStagaire[], Error>(options);
};

export default useStagairs;
