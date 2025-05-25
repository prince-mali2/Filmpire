import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { genreOrCategory } from "../features/currentGenreOrCategory";
const tmdbApiKey = import.meta.env.VITE_TMDB_KEY; 



const page = 1;
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://filmpire-backend.onrender.com/api" }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list`,
    }),

    //* Get Movies
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get movies by search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}`;
        }
        //* Get movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
          return `/movie/${genreIdOrCategoryName}?page=${page}`;
        }

        //* Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
          return `/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}`;
        }
        return `/movie/popular?page=${page}`;
      },
    }),

    //* Get movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits`,
    }),

    //* Add to Favorite List
    getList: builder.query({
      query: ({ listname, accountId, sessionId, page }) =>
        `/account/${accountId}/${listname}?session_id=${sessionId}&page=${page}`,
    }),

    //* Get user-specific movies
    getRecommendation: builder.query({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}`,
    }),

    //* Get Actors
    getActorsDetails: builder.query({
      query: (id) => `/person/${id}`,
    }),

    //* Get Actor's movies
    getMoviesByActorsId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendationQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorsIdQuery,
} = tmdbApi;
