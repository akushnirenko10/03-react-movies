import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import getMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const emptyResponseNotify = () =>
    toast.error("No movies found for your request.");

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      const data = await getMovies(query);
      if (data.length === 0) {
        emptyResponseNotify();
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (movie: Movie) => {
    setMovie(movie);
  };

  const handleCloseModal = () => {
    setMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid onSelect={handleOpenModal} movies={movies} />
      )}
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movie && <MovieModal movie={movie} onClose={handleCloseModal} />}
    </>
  );
}
