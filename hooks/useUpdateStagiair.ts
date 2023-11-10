import { IStagaire, UserRole } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useCheckAuthorizeUser from "./useCheckAuthorizeUser";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";

const useUpdateStagiair = (id: string, data: IStagaire) => {
  const queryClient = useQueryClient();
  const { role } = useCheckAuthorizeUser();
  const { data: stagebegeleiders } = useStagebegeleiders();

  const updateStagiair = async () => {
    const isoStartDate = data.startDate
      ? new Date(data.startDate).toISOString()
      : "";
    //? convert the endDate to an ISO string if there is an endDate
    const isoEndDate = data.endDate ? new Date(data.endDate).toISOString() : "";
    //? stagebegeleiderId is an array if there are multiple stagebegeleiders

    const stagebegeleiderIdArray = Array.isArray(data.stagebegeleiderId)
      ? data.stagebegeleiderId
      : [data.stagebegeleiderId];

    //? if auth is stagebeglerider, stagebegeleider cant remove himself from the stagiair

    if (role === UserRole.STAGEBEGELEIDER) {
      //? if the stagebegeleiderId is not in the array, push the stagebegeleiderId to the array
      const stagebegeleiderId = stagebegeleiders?.find((stagebegeleider) =>
        data.stagebegeleiderId.includes(stagebegeleider.id)
      )?.id;

      if (stagebegeleiderId) {
        stagebegeleiderIdArray.push(stagebegeleiderId);
      }
    }

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
      queryClient.invalidateQueries(["stagairs"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateStagiair;
