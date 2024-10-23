import css from './MovieCast.module.css';
import { defImg } from '../../api/defImg';
import { useEffect, useState } from 'react';
import { fetchMoviesCast } from '../../api/api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const imgPath = 'https://image.tmdb.org/t/p/w500/';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchDetailsCastInfo = async () => {
      try {
        setIsLoading(true);
        if (!movieId) {
          return;
        }
        const movieObj = await fetchMoviesCast(movieId);
        setMovieCast(movieObj);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetailsCastInfo();
  }, [movieId]);

  let cast = movieCast?.cast || [];

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {cast.length === 0 ? (
        <p>No cast information available</p>
      ) : (
        <>
          <ul className={css.castList}>
            {cast.map(filmCast => {
              return (
                <li key={filmCast.id} className={css.castListItem}>
                  <img
                    className={css.castListItemImg}
                    src={
                      filmCast.profile_path
                        ? `${imgPath}/${filmCast.profile_path}`
                        : defImg
                    }
                    alt="actor photo"
                  />
                  <div className={css.castListItemContainer}>
                    <p>Name: {filmCast.name}</p>
                    <p>Role: {filmCast.character}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
export default MovieCast;
