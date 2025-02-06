import { useEffect, useMemo, useState } from "react";
import { getTrandingMovies } from "../appwrite";

export const useFetchTrandingMovies = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [trendingMovies, setTrendingMovies] = useState<TrandingMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrandingMovies = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const movies = await getTrandingMovies();
      movies && setTrendingMovies(movies);
    } catch (error) {
      console.log(`Error fetching tranding movies: ${error}`);
      setErrorMessage(
        "Error fetching tranding movies. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrandingMovies();
  }, []);

  return { errorMessage, trendingMovies, isLoading };
};
