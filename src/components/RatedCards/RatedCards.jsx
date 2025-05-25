// import React from 'react';
import { Typography,Box } from '@mui/material';
import { Movie } from '..';
import { SpaceAround } from './styles';


const RatedCards = ({title , data}) => {
  return (
    <SpaceAround>
        <Typography variant='h5' gutterBottom>{title}</Typography>
        <Box display="flex" flexWrap="wrap">
            {data?.map((movie,i)=>(
                <Movie key={movie?.movieId || `movie-${i}`} movie={movie} i={i}/>
            ))}
        </Box>
    </SpaceAround>
  )
}

export default RatedCards