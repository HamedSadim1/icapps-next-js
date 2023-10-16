import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IStagebeschrijving } from "@/types";

const apiClient = new APIClient<IStagebeschrijving>("/stagebeschrijving");

const useStagebeschrijving = (
  id: string
): UseQueryResult<IStagebeschrijving, Error> => {
  const queryFn = async (): Promise<IStagebeschrijving> => {
    const response = await apiClient.get(id);
    return response;
  };

  const options: UseQueryOptions<IStagebeschrijving, Error> = {
    queryKey: ["stagebeschrijving", id],
    queryFn,
  };

  return useQuery<IStagebeschrijving, Error>(options);
};

export default useStagebeschrijving;
