
import { styled, InputBase } from "@mui/material";

const SearchContainer = styled("div")(({ theme }) => ({
    [theme.breakpoints.down('sm')]:{
        display:'flex',
        justifyContent: 'center',
        width: '100%',
    }
  }));

  const Input = styled(InputBase)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? 'black' : 'white',
    filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none',
  
    // Default input styling
    '& .MuiInputBase-input': {
      padding: '8px',
    },
  
    // Responsive tweak for input padding/margin
    [theme.breakpoints.down('sm')]: {
      '& .MuiInputBase-input': {
        marginTop: '-10px',
       
        marginBottom: '10px',
      },
    },
  }));
  
  
  

  export {SearchContainer,Input};