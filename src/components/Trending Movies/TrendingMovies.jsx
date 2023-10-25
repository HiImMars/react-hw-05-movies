import { getTrendingMovies } from 'components/api/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

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
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            )
        )}
      </ul>
    </>
  );
};
