import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import UserType from "../../utils/types/user-detail-type";

type PaginatedResponse = {
  users: UserType[];
  total: number;
  limit: number;
  skip: number;
};

type FetchOptions = {
  limit?: number;
  skip?: number;
  token?: string;
};

const fetchPaginatedData = async ({
  urlEndpoint,
  limit = 5,
  skip = 0,
  token,
}: { urlEndpoint: string } & FetchOptions): Promise<PaginatedResponse> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    const { data } = await axios.get<PaginatedResponse>(
      `${baseUrl}/${urlEndpoint}`,
      {
        params: { limit, skip },
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return data;
  } catch (error) {
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

const usePaginatedFetch = (urlEndpoint: string, options: FetchOptions = {}) => {
  const { limit = 5, skip = 0, token } = options;

  return useQuery<PaginatedResponse, AxiosError>({
    queryKey: ["paginatedData", urlEndpoint, limit, skip],
    queryFn: () => fetchPaginatedData({ urlEndpoint, limit, skip, token }),
    enabled: !!urlEndpoint,
    // keepPreviousData: true
  });
};

export default usePaginatedFetch;
