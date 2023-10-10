import useStagair from "./useStagair";

const useFetchStagairDataById = (id: string) => {
  const { data, isLoading, isError } = useStagair(id);

  return { data, isLoading, isError };
};

export default useFetchStagairDataById;
