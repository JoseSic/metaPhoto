import { useState, useCallback } from "react";

const UseHttp = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const sendDataRequest = useCallback( async (apiUri, parameters, applyData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUri + new URLSearchParams(parameters));

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  },[]);

  return {
    isLoading,
    isError,
    sendDataRequest,
  };
};

export default UseHttp;
