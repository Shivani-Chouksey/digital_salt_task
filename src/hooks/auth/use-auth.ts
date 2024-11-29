import axios from "axios";
import { useState } from "react";

type authData = {
  username: string; 
  password: string;
};

type ApiResponse= {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  gender: string;
  image: string;
};

const useAuth = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState<ApiResponse>();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const auth = async (urlEndpoint: string, data: authData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<ApiResponse>(`${baseUrl}/${urlEndpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setSuccess(true)
        setLoading(false);
        setData(response.data);
        
      }
    } catch (err: any) {
      setSuccess(false)
      setError(err.message || "An error occurred while deleting the resource.");
      throw err; // Rethrow error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  };

  return{auth,data,loading,error,success}
};

export default useAuth;
