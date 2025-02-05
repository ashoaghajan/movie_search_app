import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

export const useFetchMovies = (query: string) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const { data } = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        setMovies(data.results);
      } catch (error) {
        console.log(`Error fetching movies: ${error}`);
        setErrorMessage("Error fetching movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchMovies();
    }, [query]);

    return {errorMessage, movies, isLoading}
}
