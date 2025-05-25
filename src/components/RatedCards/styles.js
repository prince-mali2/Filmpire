import { styled,Grid } from "@mui/material";

const SpaceAround = styled(Grid)(({ theme }) => ({
//   display:' flex',
  // justifyContent: 'space-around',
  margin: '0px 30px !important',
  

  [theme.breakpoints.down('sm')]:{
    flexDirection: 'column',
    flexWrap: 'wrap',
  }

  
}));


export {SpaceAround};