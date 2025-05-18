import { styled, Typography,Grid } from "@mui/material";

const ContainerSpaceAround = styled(Grid)(({ theme }) => ({
  display:' flex',
  // justifyContent: 'space-around',
  margin: '20px 0 !important',
  

  [theme.breakpoints.down('sm')]:{
    flexDirection: 'column',
    flexWrap: 'wrap',
  }

  
}));

const PosterContainer = styled("div")(({ theme }) => ({
  borderRadius: "20px",
  maxWidth:'90%',
  boxShadow: "0.5em 1em 1em rgb(64,64,70)",
  overflow: "hidden",
  width: "340px", // Default width
  height: "525px", // Default height
  margin: "0 auto", // Center the image horizontally
  marginBottom: "30px !important", // Add spacing
  // marginTop: "10px !important", // Add spacing
  

  [theme.breakpoints.down("md")]: {
    margin: '0 auto',
    width: "250px", // Adjust width for smaller devices
    height: "375px", // Maintain aspect ratio for smaller devices
    marginBottom: "30px !important", // Add spacing
  marginTop: "20px !important", // Add spacing
  marginLeft:"40px"


  },
  [theme.breakpoints.down("sm")]: {
    margin: '0 auto',

    width: "250px", // Adjust width for smaller devices
    height: "375px", // Maintain aspect ratio for smaller devices
    marginBottom: "30px", // Add spacing
  marginTop: "20px !important", // Add spacing
  marginLeft:"40px"


  },
}));

const Poster = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover", // Ensures the image fills the container proportionally
}));
const TextContainer = styled(Typography)(({ theme }) => ({
  maxWidth: '900px', // limits width of text content
  // padding: '0 20px',
  wordWrap: 'break-word',
  [theme.breakpoints.down("sm")]: {
    maxWidth: '100%',
    padding: '0 10px',
  },
}));

export {Poster, PosterContainer ,ContainerSpaceAround,TextContainer};