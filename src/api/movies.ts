import axios from "axios";
import { API_BASE_URL, API_KEY } from "../consts";
import { useEffect, useMemo, useState } from "react";
import { updateSearchCount } from "../appwrite";

export const useFetchMovies = (query: string) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTerm = useMemo(() => query.trim().toLowerCase(), [query]);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const endpoint = searchTerm
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setMovies(data.results);
      if (searchTerm?.length > 1 && data.results.length) {
        await updateSearchCount(searchTerm, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchTerm]);

  return { errorMessage, movies, isLoading };
};
