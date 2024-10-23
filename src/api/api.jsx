import axios from 'axios';

const MY_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDhiYTYyZjFmMGM3MmVlMzc0MGMyZGVlNGVjNzAxNiIsIm5iZiI6MTcyOTUzMDY3NS4xMjM5OTksInN1YiI6IjY3MTY3ODMyZTZlZGMzYmFkNjEwNjRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zmJREcb_seq4m4W1R58mziR_fpzRHYecEV5BdejoaD4';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers = {
  Authorization: `Bearer ${MY_KEY}`,
  accept: 'application/json',
};

export const fetchTrendMovies = async () => {
  const response = await axios.get('/trending/movie/day?');
  return response.data;
};

export const fetchTrendMoviesByQuery = async query => {
  const response = await axios.get(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  );
  return response.data;
};

export const fetchMoviesById = async movieId => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`);
  return response.data;
};

export const fetchMoviesCast = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits?language=en-US`);
  return response.data;
};

export const fetchMoviesReviews = async movieId => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US&page=1`
  );
  return response.data;
};
