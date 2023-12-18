import { IStagaire, UserRole } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useCheckAuthorizeUser from "./useCheckAuthorizeUser";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";

const useUpdateStagiair = (id: string, data: IStagaire) => {
  const queryClient = useQueryClient();
  const { role,userEmail } = useCheckAuthorizeUser();
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
  
  //? If auth is stagebeglerider, make sure they can't remove themselves from the stagiair
  if (role === UserRole.STAGEBEGELEIDER) {
    //? Check if the user's email is in the list of stagebegeleiders
    const isUserStagebegeleider = stagebegeleiders?.some(
      (stagebegeleider) => userEmail === stagebegeleider.email
    );
  
    //? If the user is a stagebegeleider and their email is in the list, add their ID to the array
    if (isUserStagebegeleider) {
      const userStagebegeleiderId = stagebegeleiders?.find(
        (stagebegeleider) => userEmail === stagebegeleider.email
      )?.id;
  
      if (userStagebegeleiderId) {
        //? Make sure the user's ID is always present in the array
        if (!stagebegeleiderIdArray.includes(userStagebegeleiderId)) {
          stagebegeleiderIdArray.push(userStagebegeleiderId);
        }
      }
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
      queryClient.invalidateQueries(["overzicht"]);
    },
    onError: (error) => {
  
    },
  });
};

export default useUpdateStagiair;
