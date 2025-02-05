import { POSTER_BASE_URL } from "../consts";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie: { title, poster_path, vote_average, release_date, original_language },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path ? `${POSTER_BASE_URL}/${poster_path}` : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">{release_date && release_date.split("-")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
