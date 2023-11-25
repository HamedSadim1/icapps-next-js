import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import APIClient from "@/services/api-client";
import { IStagaire,IChecklistSection } from "@/types";
import { ChecklistSectionData } from "@/data/ChecklistData";

const apiClient = new APIClient<IStagaire>("/users/stagiair");

const useStagair = (id: string): UseQueryResult<IStagaire, Error> => {
  const queryFn = async (): Promise<IStagaire> => {
    const response = await apiClient.get(id);
    return response;
  };

  const options: UseQueryOptions<IStagaire, Error> = {
    queryKey: ["stagair"],

    // initialData: {
    //   checklistsection: ChecklistSectionData as IChecklistSection[],
    // } as IStagaire,

    queryFn,
  };

  return useQuery<IStagaire, Error>(options);
};

export default useStagair;
