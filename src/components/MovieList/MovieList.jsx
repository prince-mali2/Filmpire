// import React from 'react'
import { Grid } from '@mui/material';
import useStyles from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({movies,numberOfMovies}) => {
    
    const classes=useStyles();
    
  return (
    <Grid container className={classes.moviesContainer}>
      {movies?.results ? movies.results.slice(0,numberOfMovies).map((movie,i)=>(
        (movie?.poster_path ? <Movie key={i} movie={movie} i={i}/> : null) 
      )) 
      :
      
      movies.cast.slice(0,numberOfMovies).map((movie,i)=>(
        
       (movie?.poster_path ? <Movie key={i} movie={movie} i={i}/> : null) 
      )) 
    
    
    }
    </Grid>
  )
}

export default MovieList