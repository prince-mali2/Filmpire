import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

// Fix: Ensure makeStyles correctly gets the theme
const useStyles = makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  image: {
    width: '70%',
  },
}));

// Fix: Use PascalCase naming for styled components
const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none', // Ensure it overrides default styles
  '&:hover': {
    textDecoration: 'none !important',
  },
}));

// Fix: Apply the correct filter logic
const GenreImage = styled('img')(({ theme }) => ({
  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
}));

export { StyledLink, GenreImage };
export default useStyles;
