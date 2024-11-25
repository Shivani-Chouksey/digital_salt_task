import axios from "axios"
import { useEffect, useState } from "react";

 const useFetchList=(urlEndpoint:string)=>{
    const [data, setData] = useState<unknown[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${process.env.BASE_URL}/${urlEndpoint}`);
            setData(response.data); // Assuming response.data is an array of `FetchData`
          } catch (err: any) {
            setError(err.message || "An error occurred while fetching data.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [urlEndpoint]); // Re-run when `urlEndpoint` changes

      return{data,loading,error}
}

export default useFetchList