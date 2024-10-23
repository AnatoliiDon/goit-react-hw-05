import css from './MovieList.module.css';
import { defImg } from '../../api/defImg';
import { Link, useLocation } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

const MovieList = ({ data }) => {
  const location = useLocation();
  const imgPath = 'https://image.tmdb.org/t/p/w500/';
  if (data === null) {
    return <NotFoundPage />;
  }
  return (
    <ul className={css.movieList}>
      {data.map(movie => {
        return (
          <li key={movie.id} className={css.movieListItem}>
            <Link state={{ from: location }} to={`/movies/${movie.id}`}>
              <div className={css.movieListItemContainer}>
                <img
                  className={css.movieListItemImg}
                  src={
                    movie.poster_path
                      ? `${imgPath}/${movie.poster_path}`
                      : defImg
                  }
                  alt="poster"
                />
                <div>
                  <h3>{movie.original_title}</h3>
                  <p>Rating: {movie.vote_average}</p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
