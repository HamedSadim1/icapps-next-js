import { useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { IStagaireResponse } from "@/types";

// Custom hook for fetching a list of stagiaires (interns) based on search and pagination parameters
export const useGetAllStagiaire = (
  search: string, // Search query for filtering stagiaires by name
  page: number // Page number for pagination
) => {
  // Get an instance of the query client from React Query
  const queryClient = useQueryClient();

  // Use the useQuery hook to fetch stagiaire data
  return useQuery<IStagaireResponse>(
    // Unique query key based on the search term and page number
    ["overzicht", search, page],
    // Async function to fetch data from the API
    async () => {
      // Define query parameters based on whether there is a search term
      const params = search ? { name: search, page: 1 } : { page };

      // Make a GET request to the API endpoint for stagiaires
      const { data } = await axios.get(`/api/users/stagiair`, { params });
     
      // Return the fetched data
      return data;

     
    },

    // Query options
    {
      // Keep previous data while refetching for a smoother user experience
      keepPreviousData: true,
      

      // Callback function that runs when the query is successful
      onSuccess: (data) => {
        // Update the query data in the cache with the latest fetched data
        queryClient.setQueryData<IStagaireResponse>(
          ["overzicht", search, page],
          data
        );
      },

      // Callback function that runs when there is an error during the query
      onError: (error) => {
        throw new Error("Er is ")
     
      }
    }
  );
};
