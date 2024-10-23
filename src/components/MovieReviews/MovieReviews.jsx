import css from './MovieReviews.module.css';
import { defImg } from '../../api/defImg';
import { useEffect, useState } from 'react';
import { fetchMoviesReviews } from '../../api/api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieReviews = () => {
  const [movieReviews, setmovieReviews] = useState([]);
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
        const movieObj = await fetchMoviesReviews(movieId);
        setmovieReviews(movieObj);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetailsCastInfo();
  }, [movieId]);
  let reviews = movieReviews?.results || [];

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length === 0 ? (
        <p>No reviews information available</p>
      ) : (
        <>
          <ul className={css.reviewsList}>
            {reviews.map(review => {
              return (
                <li key={review.id} className={css.reviewsListItem}>
                  <h3>{review.author}</h3>
                  <img
                    className={css.reviewsListImg}
                    src={
                      review.author_details.avatar_path
                        ? `${imgPath}/${review.author_details.avatar_path}`
                        : defImg
                    }
                    alt="avatar"
                  />
                  <p>Added date: {review.created_at}</p>
                  <p>{review.content}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieReviews;
