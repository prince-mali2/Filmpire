import { styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { Modal } from "@mui/material";



// Styled link component
const ContainerSpaceAround = styled(Grid)(({ theme }) => ({
  display:' flex',
  justifyContent: 'space-around',
  margin: '20px 0 !important',
  

  [theme.breakpoints.down('sm')]:{
    flexDirection: 'column',
    flexWrap: 'wrap',
  }

  
}));

const PosterContainer = styled("div")(({ theme }) => ({
  borderRadius: "20px",
  boxShadow: "0.5em 1em 1em rgb(64,64,70)",
  overflow: "hidden",
  width: "340px", // Default width
  height: "525px", // Default height
  margin: "0 auto", // Center the image horizontally
  marginBottom: "30px !important", // Add spacing

  [theme.breakpoints.down("md")]: {
    margin: '0 auto',
    width: "225px", // Adjust width for smaller devices
    height: "350px", // Maintain aspect ratio for smaller devices
    marginBottom: "30px !important", // Add spacing

  },
  [theme.breakpoints.down("sm")]: {
    width: "250px", // Adjust width for smaller devices
    height: "375px", // Maintain aspect ratio for smaller devices
    marginBottom: "30px", // Add spacing
  },
}));

const Poster = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover", // Ensures the image fills the container proportionally
}));

const GenreContainer = styled(Grid)(({ theme }) => ({
  margin: '20px 100px !important',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'warp'
}));  

const GenreImage = styled("img")(({ theme }) => ({
  filter: theme.palette.mode === 'dark' && 'invert(1)',
  marginRight:'10px'
})); 

const Links = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',
  [theme.breakpoints.down('sm')]:{
    padding: '0.5rem 1em'
  }
})); 

const TextContainer = styled(Typography)(({ theme }) => ({
  maxWidth: '1000px', // limits width of text content
  // padding: '0 20px',
  wordWrap: 'break-word',
  [theme.breakpoints.down("sm")]: {
    maxWidth: '100%',
    padding: '0 10px',
  },
})); 

const CastImages = styled('img')(({ theme }) => ({
  width:'225px',
  maxWidth: '7em',
  height: '150px',
  objectFit:'cover',
  borderRadius:'10px'
})); 

const ButtonContainer = styled(Grid)(({ theme }) => ({
  display:'flex',
  flexDirection:'row',

  justifyContent:'space-between',
  width:'100%',
  [theme.breakpoints.down('sm')]:{
    flexDirection:'column',
    margin:'10px auto'
  }
})); 

const Modals = styled(Modal)(({ theme }) => ({
  display:'flex',
  alignItems: 'center',
  justifyContent:'center',
})); 

const Videos = styled('iframe')(({ theme }) => ({
  alignItems: 'center',
  justifyContent:'center',
  width:'50%',
  height:'50%',
  [theme.breakpoints.down('sm')]:{
    width:'99%',
    height:'25%',
  }
}));


export { ContainerSpaceAround,Poster,PosterContainer,GenreContainer,GenreImage,Links,TextContainer,CastImages,ButtonContainer,Modals,Videos};
