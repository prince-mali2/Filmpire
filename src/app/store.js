import {configureStore} from '@reduxjs/toolkit';
import  genreOrCategoryReducer  from '../features/currentGenreOrCategory';

import { tmdbApi } from '../services/TMDB';
export default configureStore({
    reducer:{
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
});