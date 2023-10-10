import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IStagebegeleider } from "@/types";

const apiClient = new APIClient<IStagebegeleider>("/stagebegeleider");

const useStagebegeleiders = (): UseQueryResult<IStagebegeleider[], Error> => {
  const queryFn = async (): Promise<IStagebegeleider[]> => {
    const response = await apiClient.getAll();
    return response;
  };

  const options: UseQueryOptions<IStagebegeleider[], Error> = {
    queryKey: ["stagebegeleiders"],
    queryFn,
  };

  return useQuery<IStagebegeleider[], Error>(options);
};

export default useStagebegeleiders;
