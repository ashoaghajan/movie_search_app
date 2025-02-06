import { useFetchTrandingMovies } from "../api/trendingMovies";
import Spinner from "./Spinner";

interface TrandingMoviesProps {}

const TrandingMovies: React.FC<TrandingMoviesProps> = () => {
  const { trendingMovies, isLoading, errorMessage } = useFetchTrandingMovies();
  return (
    <section className="trending">
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : trendingMovies.length ? (
        <>
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
};

export default TrandingMovies;
