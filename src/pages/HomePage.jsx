import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../api/api';
import MovieList from '../components/MovieList/MovieList';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrendingMoviesHandler = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();

        setMovies(data.results);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMoviesHandler();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Trending</h2>
      {loading && <Loader />}
      {error ? <ErrorMessage /> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
