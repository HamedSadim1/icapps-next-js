import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IUser } from "@/types";

const apiClient = new APIClient<IUser>("/users");

const useUser = (id: string): UseQueryResult<IUser, Error> => {
  const queryFn = async (): Promise<IUser> => {
    const response = await apiClient.get(id);
    return response;
  };

  const options: UseQueryOptions<IUser, Error> = {
    queryKey: ["user", id],
    queryFn,
  };

  return useQuery<IUser, Error>(options);
};

export default useUser;
