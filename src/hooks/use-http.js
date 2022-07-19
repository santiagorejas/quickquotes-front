import { useState, useCallback, useRef, useEffect } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });

        const data = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (req) => req !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        return data;
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((AbortController) =>
        AbortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
