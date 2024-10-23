import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { defImg } from '../../api/defImg';
import css from './MovieDetails.module.css';
import clsx from 'clsx';

const MovieDetails = ({ movieDetail }) => {
  const imgPath = 'https://image.tmdb.org/t/p/w500/';
  const genres = movieDetail.genres
    ? movieDetail.genres.map(genre => genre.name).join(', ')
    : 'No genres available';

  const activeStyle = ({ isActive }) =>
    clsx(css.link, isActive && css.activeLink);

  const location = useLocation();
  const navigate = useNavigate();
  const prevPageUrl = location.state?.from || '/movies';

  const goBack = () => navigate(prevPageUrl);

  return (
    <>
      <button className={css.backBtn} onClick={goBack}>
        Go back
      </button>
      <div className={css.contentWrapper}>
        <img
          className={css.posterImg}
          src={
            movieDetail.poster_path
              ? `${imgPath}/${movieDetail.poster_path}`
              : defImg
          }
          alt={movieDetail.title}
        />
        <div className={css.textContainer}>
          <h3>{movieDetail.title}</h3>
          <span>User Score: {movieDetail.vote_average}</span>
          <br />
          <span>Overview</span>
          <p>{movieDetail.overview}</p>
          <span>Genres:</span>
          <p>{genres}</p>
        </div>
      </div>
      <div>
        <h3 className={css.detailsTitle}>More Info</h3>
        <div className={css.detailsLink}>
          <NavLink
            className={activeStyle}
            state={{ from: prevPageUrl }}
            to={`/movies/${movieDetail.id}/cast`}
          >
            Cast
          </NavLink>
          <NavLink
            className={activeStyle}
            state={{ from: prevPageUrl }}
            to={`/movies/${movieDetail.id}/reviews`}
          >
            Reviews
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
