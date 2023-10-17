import { IStagaire } from "@/types";
import { useMutation, useQueryClient } from "react-query";

// Define a custom hook that accepts the id and data as parameters
const useUpdateStagiair = (id: string, data: IStagaire) => {
  // Get the query client instance
  const queryClient = useQueryClient();

  // Define the mutation function that sends the PATCH request
  const updateStagiair = async () => {
    const isoStartDate = data.startDate
      ? new Date(data.startDate).toISOString()
      : "";
    const isoEndDate = data.endDate ? new Date(data.endDate).toISOString() : "";
    // Ensure stagebegeleiderId is an array of unique strings
    const stagebegeleiderIdArray = Array.isArray(data.stagebegeleiderId)
      ? data.stagebegeleiderId
      : [data.stagebegeleiderId];
    const response = await fetch(
      `http://localhost:3000/api/users/stagiair/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          startDate: isoStartDate,
          endDate: isoEndDate,
          stagebegeleiderId: stagebegeleiderIdArray,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  // Use the useMutation hook to return the mutation object
  return useMutation(updateStagiair, {
    // On success, invalidate the query with the same key as the fetch query
    onSuccess: () => {
      queryClient.invalidateQueries(["stagiair", id]);
      queryClient.refetchQueries(["stagiairs"]);
    },
  });
};

export default useUpdateStagiair;
