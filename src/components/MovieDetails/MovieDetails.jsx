import { getMovieDetails } from 'components/api/api';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetails.module.css';

export const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovieDetail(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const { title, overview, genres, poster_path, vote_average } = movieDetail;

  return (
    <main>
      <section className={css.section}>
        <div className={css.wrapper}>
          <Link to={location.state} className={css.back}>
            Go back
          </Link>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            width={320}
            height={380}
            loading="lazy"
            alt="poster"
            className={css.img}
          />
          <div className={css.detailsWrapper}>
            <h2 className={css.title}>{title}</h2>
            <h3 className={css.subtitle}>User score: {vote_average}</h3>
            <h3 className={css.subtitle}>Overview</h3>
            <p className={css.overview}>{overview} </p>
            <h3 className={css.subtitle}>Genres</h3>
            <ul className={css.list}>
              {genres &&
                genres.length > 0 &&
                genres.map(({ id, name }) => (
                  <li key={id} className={css.item}>
                    {name}
                  </li>
                ))}
            </ul>
          </div>
          <div className={css.additional}>
            <h2 className={css.title}>Additional information</h2>
            <Link to="cast" className={css.link} state={location}>
              Cast
            </Link>
            <Link to="reviews" className={css.link} state={location}>
              Reviews
            </Link>
          </div>
          <Outlet />
        </div>
      </section>
    </main>
  );
};
