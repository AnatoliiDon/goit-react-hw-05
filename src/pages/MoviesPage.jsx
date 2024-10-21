import SearchBar from '../components/SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from '../api/api';
import MovieList from '../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  const onSearch = searchTerm => {
    setSearchParams({ q: searchTerm });
  };

  useEffect(() => {
    const fetchSearchMoviesHandler = async () => {
      try {
        setLoading(true);
        const data = await fetchSearchMovies(query);
        const results = data.results;
        if (results.length === 0) {
          toast.error('We can`t find any film on your request', {
            position: 'top-left',
            style: {
              border: '1px solid #f52121',
              padding: '16px',
              color: '#fafafa',
              height: '20px',
              fontWeight: '500',
              backgroundColor: 'red',
            },
          });
          return;
        }
        setMovies(data.results);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchSearchMoviesHandler();
    }
  }, [query]);

  return (
    <div>
      <Toaster />
      {<SearchBar onSearch={onSearch} />}
      {loading && <Loader />}
      {error ? <ErrorMessage /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
