import useSWRImmutable from "swr/immutable";

export const useGetSWR = <T>(url: string, options?: any) => {
  const { data, error } = useSWRImmutable<T>(url, options);

  return {
    data: data,
    isError: error,
    isLoading: !error && !data,
  };
};

export const useGetSWRWithToken = <T>(url: string, token: string) => {
  const { data, error } = useSWRImmutable<T>([url, token]);

  return {
    data: data,
    isError: error,
    isLoading: !error && !data,
  };
};
