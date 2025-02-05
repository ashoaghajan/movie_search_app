import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useEffect, useState } from "react";

export const useFetchMovies = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const {data} = await axios.get(endpoint);
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
    }, []);

    return {errorMessage, movies, isLoading}
}
