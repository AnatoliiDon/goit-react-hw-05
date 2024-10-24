import { useEffect, useState } from 'react';
import { fetchTrendMovies } from '../api/api';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import MovieList from '../components/MovieList/MovieList';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const moviesObj = await fetchTrendMovies();
        setData(moviesObj.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <ErrorMessage />}
      <MovieList data={data} />
    </div>
  );
};
export default HomePage;
