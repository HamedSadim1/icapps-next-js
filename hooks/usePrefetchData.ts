import { useQueryClient } from "react-query";

export const usePrefetchData = () => {
  const queryClient = useQueryClient();

  const prefetchData = async () => {
    console.log("Fetching data ...")
    await queryClient.prefetchQuery("stagairs", () =>
      fetch("http://localhost:3000/api/users/stagiair").then((res) => res.json())
    );
    await queryClient.prefetchQuery("users", () =>
      fetch("http://localhost:3000/api/users").then((res) => res.json())
    );
    
  };

  return { prefetchData };
};

export const usePrefetchStagairDetails = () => {
  const queryClient = useQueryClient();

  const prefetchData = async (id: string) => {
    await queryClient.prefetchQuery(["stagair"], () =>
      fetch(`http://localhost:3000/api/users/stagiair/${id}`).then((res) =>
        res.json()
      )
    );
  };

  return { prefetchData };
};
