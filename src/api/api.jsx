import axios from 'axios';

const KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDhiYTYyZjFmMGM3MmVlMzc0MGMyZGVlNGVjNzAxNiIsIm5iZiI6MTcyOTUzMDY3NS4xMjM5OTksInN1YiI6IjY3MTY3ODMyZTZlZGMzYmFkNjEwNjRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zmJREcb_seq4m4W1R58mziR_fpzRHYecEV5BdejoaD4';

const moviesInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${KEY}`,
  },
  params: {
    include_adult: 'false',
  },
};

export const fetchTrendingMovies = async () => {
  const responseT = await moviesInstance.get('trending/movie/day', options);

  return responseT.data;
};

export const fetchSearchMovies = async query => {
  options.params.query = query;
  const response = await moviesInstance.get('search/movie', options);

  return response.data;
};

export const fetchDetailsMovie = async id => {
  const response = await moviesInstance.get(`movie/${id}`, options);

  return response.data;
};

export const fetchCastMovie = async id => {
  const response = await moviesInstance.get(`movie/${id}/credits`, options);

  return response.data;
};

export const fetchReviewsMovie = async id => {
  const response = await moviesInstance.get(`movie/${id}/reviews`, options);

  return response.data;
};
