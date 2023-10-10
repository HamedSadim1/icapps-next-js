import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IStagaire } from "@/types";

const apiClient = new APIClient<IStagaire>("/users/stagiair");

const useStagair = (id: string): UseQueryResult<IStagaire, Error> => {
  const queryFn = async (): Promise<IStagaire> => {
    const response = await apiClient.get(id);
    return response;
  };

  const options: UseQueryOptions<IStagaire, Error> = {
    queryKey: ["stagair", id],
    queryFn,
  };

  return useQuery<IStagaire, Error>(options);
};

export default useStagair;
