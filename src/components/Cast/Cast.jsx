import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieCast } from 'components/api/api';
import css from './Cast.module.css';

export const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieCast(id);
        console.log(data.cast);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ul className={css.list}>
      {cast &&
        cast.length &&
        cast.map(({ id, profile_path, name, character }) => {
          return (
            <li key={id} className={css.item}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : `http://www.suryalaya.org/images/no_image.jpg`
                }
                alt={name}
                className={css.img}
              />
              <h2 className={css.title}>{name}</h2>
              {character && (
                <p className={css.character}>Character: {character}</p>
              )}
            </li>
          );
        })}
    </ul>
  );
};
