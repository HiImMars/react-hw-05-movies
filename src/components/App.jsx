import { Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Home';
import { Movies } from './pages/Movies';
import { Layout } from './Layout/Layout';
import { MovieDetails } from './MovieDetails/MovieDetails';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetails />} />
      </Route>
    </Routes>
  );
};
