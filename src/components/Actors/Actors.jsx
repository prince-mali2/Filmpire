import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetActorsDetailsQuery, useGetMoviesByActorsIdQuery } from '../../services/TMDB';
import { Box,CircularProgress,Button,Grid } from '@mui/material';
import { ArrowBack} from '@mui/icons-material';
import { Typography} from '@mui/material';
import {MovieList,Pagination} from '..';


import { Poster, PosterContainer,ContainerSpaceAround,TextContainer } from './styles';

const Actors = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isFetching, error} = useGetActorsDetailsQuery(id);
    const[page, setPage] = useState(1);
    const {data : movies} = useGetMoviesByActorsIdQuery({id, page});
     
    console.log(data);
    if (isFetching) {
        return (
          <Box display="flex" justifyContent="center" alignContent="center">
            <CircularProgress size="6rem" />
          </Box>
        );
      }
      
      if (error) {
          return (
            <Box display="flex" justifyContent="center" alignItems="center">
      <Button startIcon={<ArrowBack/>}onClick={()=>navigate(-1)} color="Primary">Go Back</Button>
    </Box>
          );
        }


  return (
    <>
    <ContainerSpaceAround container >
    
    <Grid size={{lg:5, xl:4}} >
      <PosterContainer>
      <Poster
      src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
      alt={data.name}
      />
      </PosterContainer>
      </Grid>

      <Grid item size={{lg:7, xl:8}} style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
          <Typography variant="h3" gutterBottom>
            {data?.name}
          </Typography>
           <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Place: {data?.place_of_birth}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
            IMDB
            </Button>
            <Button startIcon={<ArrowBack/>} onClick={()=>navigate(-1)} color="primary">Go Back</Button>

          </Box>
      </Grid>

    </ContainerSpaceAround>

    <Box margin="2rem 0">
      <Typography variant='h2' gutterBottom align='center'>Movies</Typography>
      {movies && <MovieList movies={movies} numberOfMovies={18}/>}
      <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages}/>
    </Box>

   
    </>
  )
}

export default Actors