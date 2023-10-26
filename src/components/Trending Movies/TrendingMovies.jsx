import { getTrendingMovies } from 'components/api/api';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    <>
      <h1>Trending Movies</h1>
      <ul>
        {trendingMovies.map(
          movie =>
            movie.title && (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={location}>
                  {movie.title}
                </Link>
              </li>
            )
        )}
      </ul>
    </>
  );
};
