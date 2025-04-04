import { styled } from '@mui/material/styles';
import { Toolbar, IconButton } from '@mui/material';


const drawerWidth=240;
const useStyles = (theme) => ({

  Toolbar: styled(Toolbar)(({ theme }) => ({
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexWrap : 'wrap',
      marginLeft: '0', 
    },
  })),

  MenuButton: styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  })),

 

  drawer: styled('drawer')(({theme})=>({
    
    [theme.breakpoints.up('sm')]: {
      width:drawerWidth,
      flexShrink:0,
    },
  })),

  drawerPaper:{
    width: drawerWidth,
  },
  linkButton:{
    '&:hover' :{
        color: 'white !important',
        textDecoration:'none',
    }
  }
  
});

export default useStyles;
