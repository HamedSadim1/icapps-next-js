import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IPost } from "@/types";

const apiClient = new APIClient<IPost>("/doelen");

const useFetchDoelen = (): UseQueryResult<IPost[], Error> => {
  const queryFn = async (): Promise<IPost[]> => {
    const response = await apiClient.getAll();
    return response;
  };

  const options: UseQueryOptions<IPost[], Error> = {
    queryKey: ["doelen"],
    queryFn,
  };

  return useQuery<IPost[], Error>(options);
};
