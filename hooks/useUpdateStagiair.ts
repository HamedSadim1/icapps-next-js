import { IStagaire } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateStagiair = (id: string, data: IStagaire) => {
  const queryClient = useQueryClient();

  const updateStagiair = async () => {
    const isoStartDate = data.startDate
      ? new Date(data.startDate).toISOString()
      : "";
    const isoEndDate = data.endDate ? new Date(data.endDate).toISOString() : "";
    const stagebegeleiderIdArray = Array.isArray(data.stagebegeleiderId)
      ? data.stagebegeleiderId
      : [data.stagebegeleiderId];

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/stagiair/${id}`,
        {
          name: data.name,
          email: data.email,
          startDate: isoStartDate,
          endDate: isoEndDate,
          stagebegeleiderId: stagebegeleiderIdArray,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Return the data 
      return response.data;
    } catch (error) {
      throw new Error(`Error updating resource: ${error}`);
    }
  };

  return useMutation(updateStagiair, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stagair"]);
      queryClient.invalidateQueries(["stagairs"])
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateStagiair;
