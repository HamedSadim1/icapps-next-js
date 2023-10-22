import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IPost } from "@/types";

const apiClient = new APIClient<IPost>("/doelen");

const usePost = (id: string): UseQueryResult<IPost, Error> => {
  const queryFn = async (): Promise<IPost> => {
    const response = await apiClient.get(id);
    console.log(typeof response);
    return response;
  };

  const options: UseQueryOptions<IPost, Error> = {
    queryKey: ["post"],
    queryFn,
  };

  return useQuery<IPost, Error>(options);
};

export default usePost;
