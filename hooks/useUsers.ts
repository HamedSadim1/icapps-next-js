import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IUser } from "@/types";

const apiClient = new APIClient<IUser>("/users");

const useUsers = (): UseQueryResult<IUser[], Error> => {
  const queryFn = async (): Promise<IUser[]> => {
    const response = await apiClient.getAll()
    return response; 
  };

  const options: UseQueryOptions<IUser[], Error> = {
    queryKey: ["users"],
    queryFn,
  };

  return useQuery<IUser[], Error>(options);
};

export default useUsers;
