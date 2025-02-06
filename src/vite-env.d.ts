/// <reference types="vite/client" />

type Movie = {
  title: string;
  id: number;
  vote_average: number;
  poster_path: string;
  release_date: string;
  original_language: string;
};

type TrandingMovie = {
  title: string;
  searchTerm: string;
  $id: string;
  count: number;
  poster_url: string;
  movie_id: number;
};
