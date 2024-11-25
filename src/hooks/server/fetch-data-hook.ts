import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

type FetchError = Error & { status?: number };

type UseFetchDataParams<TData, TError = FetchError> = {
  queryKey: QueryKey;
  url: string;
  fetchOptions?: RequestInit;
  queryOptions?: Omit<UseQueryOptions<TData, TError>, 'queryKey'>;
};

const useFetchDataCustomHook = <TData = unknown, TError = FetchError>({
  queryKey,
  url,
  fetchOptions = {},
  queryOptions = {},
}: UseFetchDataParams<TData, TError>) => {
  const fetchFunction = async () => {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: { 
        'Accept': 'application/json', 
        ...fetchOptions.headers 
      },
    });

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`) as FetchError;
      error.status = response.status;
      throw error;
    }

    return response.json();
  };

  return useQuery<TData, TError>({
    queryKey,
    queryFn: fetchFunction,
    ...queryOptions,
  });
};

export default useFetchDataCustomHook;