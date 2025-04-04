import React from "react";
import useStyles from "./styles";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";

const Movies = () => {
  const classes = useStyles();
  const{data}=useGetMoviesQuery();
  console.log(data);

  return <div className={classes.widthh}>Movies</div>;
};

export default Movies;
