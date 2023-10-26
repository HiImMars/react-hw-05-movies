import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from 'components/api/api';

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
    <ul>
      {reviews.length > 0 ? (
        reviews.map(({ id, author, content, created_at }) => {
          return (
            <li key={id}>
              <h2>Author: {author}</h2>
              <p>{content}</p>
              <p>Review created at {new Date(`${created_at}`).toString()}</p>
            </li>
          );
        })
      ) : (
        <p>Sorry, we have no reviews for this movie</p>
      )}
    </ul>
  );
};
