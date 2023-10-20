import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IDocument } from "@/types";

const apiClient = new APIClient<IDocument>("/document");

const useDocuments = (): UseQueryResult<IDocument[], Error> => {
  const queryFn = async (): Promise<IDocument[]> => {
    const response = await apiClient.getAll();
    return response;
  };

  const options: UseQueryOptions<IDocument[], Error> = {
    queryKey: ["documents"],
    queryFn,
  };

  return useQuery<IDocument[], Error>(options);
};

export default useDocuments;
