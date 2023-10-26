import { getMoviesByQuery } from 'components/api/api';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const searchText = searchParams.get('search') ?? '';
  const location = useLocation();

  const handleChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setSearchParams({ search: searchQuery });
  };

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      try {
        const data = await getMoviesByQuery(searchText);
        setSearchedMovies(data.results);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          Search movies
          <input type="text" onChange={handleChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchedMovies.length > 0 ? (
          searchedMovies.map(({ id, title }) => {
            return (
              <li key={id}>
                <Link to={`/movies/${id}`} state={location}>
                  {title}
                </Link>
              </li>
            );
          })
        ) : (
          <p>Please enter a valid search query</p>
        )}
      </ul>
    </main>
  );
};
