import axios, { AxiosError } from "axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import UserType from "../../utils/types/user-detail-type";

// Define FetchError type, ensuring status and message are available
type FetchError = {
  message: string;
  status?: number;
};

const useFetchByID = <T = UserType>() => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Core fetch function
  const fetchDataById = async (
    urlEndpoint: string,
    id: string | number,
    token?: string
  ): Promise<T> => {
    try {
      // Prepare request headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Perform axios GET request
      const response = await axios.get<T>(`${baseUrl}/${urlEndpoint}/${id}`, {
        headers,
      });

      return response.data;
    } catch (err) {
      // Properly type the error as AxiosError and fetch its response if available
      const error = err as AxiosError;

      // Create a custom FetchError with status and message
      const fetchError: FetchError = {
        message: error.message || "An unexpected error occurred",
        status: error.response?.status, // Axios error response might contain a status
      };

      // Throw the typed error
      throw fetchError;
    }
  };

  // Hook function for React Query integration
  const useDetailFetchQuery = (
    urlEndpoint: string,
    id: string | number | null,
    token?: string,
    queryOptions?: Omit<UseQueryOptions<T, FetchError>, "queryKey" | "queryFn">
  ) => {
    return useQuery<T, FetchError>({
      queryKey: [urlEndpoint, id],
      queryFn: () => fetchDataById(urlEndpoint, id as string | number, token),
      enabled: !!id,
      ...queryOptions,
    });
  };

  return { fetchDataById, useDetailFetchQuery };
};

export default useFetchByID;
