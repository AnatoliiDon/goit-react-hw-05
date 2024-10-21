import { fetchCastMovie } from '../../api/api.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import { defImg } from '../../api/defImg.jsx';

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCastMoviesHandler = async () => {
      try {
        setLoading(true);
        const data = await fetchCastMovie(movieId);
        setCast(data.cast);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCastMoviesHandler();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}

      {cast == 0 ? (
        <p style={{ textAlign: 'center' }}>
          We don&apos;t have any cast for this movie.
        </p>
      ) : (
        <ul className={styles.list}>
          {cast?.length > 0 &&
            cast.map(actor => (
              <li className={styles.listItem} key={actor.cast_id}>
                <img
                  className={styles.img}
                  src={
                    actor?.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : defImg
                  }
                  alt={actor.name}
                />
                <div className={styles.wrapInfo}>
                  <h2>{actor.name}</h2>
                  <h3>Character:</h3>
                  <p>{actor.character}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
