import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IDocument } from "@/types";

const apiClient = new APIClient<IDocument>("/document");

const useDocument = (id: string): UseQueryResult<IDocument, Error> => {
  const queryFn = async (): Promise<IDocument> => {
    const response = await apiClient.get(id);
    return response;
  };

  const options: UseQueryOptions<IDocument, Error> = {
    queryKey: ["document"],
    queryFn,
  };

  return useQuery<IDocument, Error>(options);
};

export default useDocument;
