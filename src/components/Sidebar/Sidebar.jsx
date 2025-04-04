import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useStyles, { StyledLink, GenreImage } from "./styles"; // Importing styles correctly

const categories=[
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },

]

const demoCategories = [
  { label: "Comedy", value: "comedy" },
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Animation", value: "animation" },
];

const redLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
      {/* Logo */}
      <StyledLink to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmpire Logo"
        />
      </StyledLink>

      <Divider />

      {/* Categories */}
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <StyledLink key={value} to="/">
            <ListItem onClick={() => setMobileOpen(false)} button>
              <ListItemText primary={label} />
            </ListItem>
          </StyledLink>
        ))}
      </List>





      <Divider/>
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <StyledLink key={value} to="/">
            <ListItem onClick={() => setMobileOpen(false)} button>
              <ListItemText primary={label} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
