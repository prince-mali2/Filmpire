import { styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Styled link component
const StyledLink = styled(Link)(({ theme }) => ({
  alignItems: "center",
  fontWeight: "bolder",
  textDecoration: "none",
  marginTop:'20px',
  [theme.breakpoints.up("xs")]: {
    display: "flex",
    flexDirection: "column",
  },
  "&:hover": {
    cursor: "pointer",
  },
}));

// Styled movie image
const MovieImage = styled("img")(({ theme }) => ({
  borderRadius: "20px",
  height: "300px",
  marginBottom: "10px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

// Movie title text
const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textOverflow: "ellipsis",
  width: "230px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  marginTop: "10px",
  marginBottom: 0,
  textAlign: "center",
}));

export { Title, StyledLink, MovieImage };
