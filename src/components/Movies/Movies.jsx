import React,{useState,useEffect} from "react";
// import useStyles from "./styles";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import {useSelector} from 'react-redux';
import {selectGenreOrCategory} from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import {Pagination} from "..";


const Movies = () => {
  // const classes = useStyles();
  const [page, setPage] = useState(1);
   const {genreIdOrCategoryName,searchQuery} = useSelector((state)=> state.currentGenreOrCategory);

  const{data, error, isFetching}=useGetMoviesQuery({genreIdOrCategoryName, page,searchQuery});
  const lg = useMediaQuery((theme)=> theme.breakpoints.only('lg'));
  const numberOfMovies = lg?16 :18;
  
  if(isFetching){
    return(
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem"/>
      </Box>
    );
  }

  if(error) return "An error occurred";

  if(!data || !data.results?.length){
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    )
  }

  

  return(
    <div><MovieList movies={data} numberOfMovies={numberOfMovies} />
    <Pagination currentPage={page} setPage = {setPage} totalPages={data.total_pages}></Pagination>
    </div>
    
  ) 
    
};

export default Movies;
