import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({

}));
    
  const moviesContainer = styled('Grid')(({ theme }) => ({
    display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between',
        overflow:'auto',
        [theme.breakpoints.down('sm')]:{
            justifyContent:'center',
        }
  }));
  
  
  export { moviesContainer };
  export default useStyles;
  
