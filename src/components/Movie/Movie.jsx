import React from "react";
import { Grid, Grow, Rating,Tooltip } from "@mui/material";
import { StyledLink, Title, MovieImage } from "./styles";

const Movie = ({ movie, i }) => {
  return (
    <Grid  size={{xs:12, sm:6, md:4, lg:3, xl:2}}
    >
      <Grow in key={i} timeout={(i + 1) * 250}>
        <StyledLink to={`/movie/${movie.id}`}>
          <MovieImage
            alt={movie.title}
            src={
             `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                
          />
         
          <Title variant="h6">{movie.title}</Title>

          <Tooltip disableTouchListener title={`${movie.vote_average}/10`}>
            <div>
          <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>

          </Tooltip>
        </StyledLink>
      </Grow>
    </Grid>
  );
};

export default Movie;
