import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { fetchMoviesById } from '../api/api';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import MovieDetails from '../components/MovieDetails/MovieDetails';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetailsMoviesInfo = async () => {
      try {
        setIsLoading(true);
        if (movieId === null) {
          return;
        }
        const movieObj = await fetchMoviesById(movieId);
        setMovieDetail(movieObj);
        if (movieDetail === null) {
          return;
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetailsMoviesInfo();
  }, [movieId]);

  return (
    <div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <ErrorMessage />}
      <MovieDetails movieDetail={movieDetail} />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
