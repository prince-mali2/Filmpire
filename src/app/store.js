import {configureStore} from '@reduxjs/toolkit';
import  genreOrCategoryReducer  from '../features/currentGenreOrCategory';
import  userReducer  from '../features/auth';

import { tmdbApi } from '../services/TMDB';
export default configureStore({
    reducer:{
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user:userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
});