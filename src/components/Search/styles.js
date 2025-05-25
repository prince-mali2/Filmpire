
import { styled,alpha, InputBase } from "@mui/material";

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
  

  const Searchs= styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
  
  

  export {SearchContainer,Input,Searchs,SearchIconWrapper,StyledInputBase};