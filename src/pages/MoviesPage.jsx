import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import { fetchTrendMoviesByQuery } from '../api/api';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import MovieList from '../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('searchedValue');

  const onSubmit = searchedValue => {
    if (searchedValue === query) {
      return;
    }
    setSearchParams({ searchedValue });
  };

  useEffect(() => {
    if (!query) return;
    const fetchQueryMovieData = async () => {
      try {
        setIsLoading(true);
        const moviesObj = await fetchTrendMoviesByQuery(query);
        setData(moviesObj.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQueryMovieData();
  }, [query]);

  return (
    <div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <ErrorMessage />}
      <SearchBar onSubmit={onSubmit} />
      {data && <MovieList data={data} />}
    </div>
  );
};

export default MoviesPage;
