const BASE_URL = 'https://api.themoviedb.org/3';
const TRENDING_END_POINT = '/trending/all/day?language=en-US';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzBkYTAxN2Y5OGY1OGU0MTBhZDEwODA3NDBkNzJmMSIsInN1YiI6IjY1Mzk1ODEyZWM0NTUyMDEwYjNhZDBlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rx2ZWR9RXfuBY-os9saNcj_N5ckyOEDljpfCGL2KeaU',
  },
};

export const getTrendingMovies = async () => {
  return await fetch(`${BASE_URL}${TRENDING_END_POINT}`, options).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
};

export const getMovieDetails = async id => {
  return await fetch(`${BASE_URL}/movie/${id}?language=en-US`, options).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
};

export const getMovieCast = async id => {
  return await fetch(
    `${BASE_URL}/movie/${id}/credits?language=en-US'`,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export const getMovieReviews = async id => {
  return await fetch(
    `${BASE_URL}/movie/${id}/reviews?language=en-US&page=1'`,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export const getMoviesByQuery = async searchQuery => {
  return await fetch(
    `${BASE_URL}/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
