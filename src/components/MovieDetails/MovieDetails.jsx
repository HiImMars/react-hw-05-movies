// import { Cast } from 'components/Cast/Cast';
// import { Reviews } from 'components/Reviews/Reviews';
import { getMovieDetails } from 'components/api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieDetails(id);
        console.log(data);
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
      <div>
        <img
          src={poster_path}
          width={320}
          height={380}
          loading="lazy"
          alt="poster"
        />
        <div>
          <h2>{title}</h2>
          <h3>User score: {vote_average}</h3>
          <h3>Overview</h3>
          <p>{overview} </p>
          <h3>Genres</h3>
          <ul>
            {genres &&
              genres.length &&
              genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
        </div>
      </div>
    </main>
  );
};

/* <div>
      <p>MovieDetails</p>
      <Cast />
      <Reviews />
    </div> */
