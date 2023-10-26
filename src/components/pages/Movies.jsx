import { getMoviesByQuery } from 'components/api/api';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';

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
      <div className={css.wrapper}>
        <form onSubmit={handleSubmit} className={css.form}>
          <label className={css.label}>
            Search movies
            <input type="text" onChange={handleChange} className={css.input} />
          </label>
          <button type="submit" className={css.btn}>
            Search
          </button>
        </form>
        <ul className={css.list}>
          {searchedMovies.length > 0 ? (
            searchedMovies.map(({ id, title }) => {
              return (
                <li key={id} className={css.item}>
                  <Link
                    to={`/movies/${id}`}
                    state={location}
                    className={css.link}
                  >
                    {title}
                  </Link>
                </li>
              );
            })
          ) : (
            <p className={css.text}>Please enter a valid search query</p>
          )}
        </ul>
      </div>
    </main>
  );
};
