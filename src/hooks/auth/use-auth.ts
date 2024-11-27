import axios from "axios";
import { useState } from "react";

type authData = {
  username: string;
  password: string;
};
const useAuth = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState<authData>();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const auth = async (urlEndpoint: string, data: authData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${baseUrl}/${urlEndpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        //   ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (response.status === 200) {
        setLoading(true);
        setData(response.data);
        
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the resource.");
      throw err; // Rethrow error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  };

  return{auth,data,loading,error}
};

export default useAuth;
