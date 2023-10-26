import { getTrendingMovies } from 'components/api/api';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './TrendingMovies.module.css';

export const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrendingMovies();
        setTrendingMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending Movies</h1>
      <ul className={css.list}>
        {trendingMovies.map(
          movie =>
            movie.title && (
              <li key={movie.id} className={css.item}>
                <Link
                  to={`/movies/${movie.id}`}
                  state={location}
                  className={css.link}
                >
                  {movie.title}
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};
