import { useState } from "react";
import { useFetchMovies } from "../api/movies";
import { useDebounce } from "react-use";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

interface AllMoviesProps {
  searchTerm: string;
}

const AllMovies: React.FC<AllMoviesProps> = ({ searchTerm }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);
  const { errorMessage, isLoading, movies } =
    useFetchMovies(debouncedSearchTerm);

  return (
    <section className="all-movies">
      <h2>All Movies</h2>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default AllMovies;
