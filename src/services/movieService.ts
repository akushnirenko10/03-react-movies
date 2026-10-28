import axios from "axios";
import type { Movie } from "../types/movie";

const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/search",
});

interface MoviesResponse {
  results: Movie[];
}

export default async function getMovies(query: string): Promise<Movie[]> {
  const { data } = await moviesApi.get<MoviesResponse>(`/movie`, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return data.results;
}
