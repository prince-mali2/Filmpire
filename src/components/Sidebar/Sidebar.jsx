// import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Box,
  CircularProgress,
  ListItemIcon,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useStyles, { StyledLink, GenreImage } from "./styles"; // Importing styles correctly
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from '../../assets/genres';
import { useDispatch,useSelector } from "react-redux";
import {selectGenreOrCategory} from '../../features/currentGenreOrCategory';


const categories=[
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },

]


const blueLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
const redLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";

const Sidebar = ({ setMobileOpen }) => {
  const {genreIdOrCategoryName} = useSelector((state)=> state.currentGenreOrCategory);
  const theme = useTheme();
  const classes = useStyles();
  const button=true;
  const {data, isFetching} = useGetGenresQuery();
  const dispatch = useDispatch();
  
  
  

  return (
    <Box className={classes.sidebar} sx={{ width: "250px" }}>
      {/* Logo */}
      <StyledLink to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmpire Logo"
        />
      </StyledLink>

      

      {/* Categories */}
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <StyledLink key={value} to="/">
            <ListItem onClick={() =>dispatch(selectGenreOrCategory(value)) } >
            <ListItemIcon>
                <GenreImage src={genreIcons[label.toLowerCase()]}  height={30}/>
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </StyledLink>
        ))}
      </List>

      
      <List>
        <ListSubheader>Genres</ListSubheader>

        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress/>
          </Box>
        ):
        data.genres.map(({ name, id }) => (
          <StyledLink key={name} to="/">
            <ListItem onClick={() =>dispatch(selectGenreOrCategory(id)) }  >
              <ListItemIcon>
                <GenreImage src={genreIcons[name.toLowerCase()]}  height={30}/>
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </StyledLink>
        ))
        }
      </List>
    </Box>
  );
};

export default Sidebar;
