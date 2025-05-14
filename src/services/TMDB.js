import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { genreOrCategory } from "../features/currentGenreOrCategory";
const tmdbApiKey = import.meta.env.VITE_TMDB_KEY; 



const page=1;
export const tmdbApi = 
createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  
  endpoints: (builder) => ({
    //*Get Genres
    getGenres: builder.query({
      query:()=>`/genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //*Get Movies
    getMovies: builder.query({
      query: ({genreIdOrCategoryName, page,searchQuery}) => {
        //* Get movies by search
        if(searchQuery){
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get movies by category
        if(genreIdOrCategoryName && typeof (genreIdOrCategoryName) === 'string'){
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
        }

        //* Get Movies by Genre
        if(genreIdOrCategoryName && typeof (genreIdOrCategoryName) === 'number'){
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
        }
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      }
    }),
    //* Get movie
    getMovie: builder.query({
      query: (id)=> `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,

    }),

    //* Get user Specific movies
    getRecommendation: builder.query({
      query: ({movie_id, list})=> `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    })
  }),
});

export const {
  useGetGenresQuery, 
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationQuery
} 
  = tmdbApi;
