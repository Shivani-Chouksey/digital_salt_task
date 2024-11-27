import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserType from "../../utils/types/user-detail-type";

type ApiResponse = {
  users: UserType[];
};

// Generic error type
export type FetchError = Error & { status?: number };

type UseFetchListParams = {
  endpoint: string;
  token?: string;
  enabled?: boolean;
};

const useFetchList = ({
  endpoint,
  token,
  enabled = true,
}: UseFetchListParams) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchUsers = async () => {
    try {
      const response = await axios.get<ApiResponse>(baseUrl + endpoint, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return response.data;
    } catch (error: any) {
      const fetchError: FetchError = new Error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching data"
      );
      fetchError.status = error.response?.status;
      throw fetchError;
    }
  };

  return useQuery<ApiResponse, FetchError>({
    queryKey: ["users", { endpoint }],
    queryFn: fetchUsers,
    enabled,
    // Stale time of 5 minutes - data doesn't need frequent updates
    staleTime: 1000 * 60 * 5,
    // Keep previous data while refetching
    // keepPreviousData: true,
    // Retry failed requests once
    retry: 1,
  });
};

export default useFetchList;
