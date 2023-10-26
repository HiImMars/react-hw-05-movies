import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from 'components/api/api';
import css from './Reviews.module.css';

export const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieReviews(id);
        console.log(data);
        setReviews(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ul className={css.list}>
      {reviews.length > 0 ? (
        reviews.map(({ id, author, content, created_at }) => {
          return (
            <li key={id} className={css.item}>
              <h2 className={css.title}>Author: {author}</h2>
              <p className={css.text}>{content}</p>
              <p className={css.textdate}>
                Review created at {new Date(`${created_at}`).toString()}
              </p>
            </li>
          );
        })
      ) : (
        <p className={css.text}>Sorry, we have no reviews for this movie</p>
      )}
    </ul>
  );
};
