import {useState,useEffect} from "react";
import {
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  // useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  Remove,
  Add,
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined
  
} from "@mui/icons-material";

import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {  useGetMovieQuery,useGetRecommendationQuery } from "../../services/TMDB";
import { ContainerSpaceAround, Poster,PosterContainer,GenreContainer,GenreImage,Links,TextContainer,CastImages,ButtonContainer,Modals,Videos } from "./styles";
import genreIcons from '../../assets/genres';
import {selectGenreOrCategory} from '../../features/currentGenreOrCategory';
import {MovieList} from '../';
// import { userSelector } from "../../features/auth";
import { useAuth0 } from "@auth0/auth0-react";





const MovieInformation = () => {

    const {user} = useAuth0();
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  
  const { data, isFetching, error } = useGetMovieQuery(id);
 

  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationQuery({list:'recommendations', movie_id:id});
 

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);


  useEffect(() => {
    const fetchMovieStatus = async () => {

      try {
        // Check if the movie is favorited
        const favoriteResponse = await fetch(`https://filmpire-backend.onrender.com/favorites/${user?.sub}/${id}`);
        const favoriteData = await favoriteResponse.json();
        setIsMovieFavorited(favoriteData.isFavorited);

        // Check if the movie is in the watchlist
        const watchlistResponse = await fetch(`https://filmpire-backend.onrender.com/watchlist/${user?.sub}/${id}`);
        const watchlistData = await watchlistResponse.json();
        setIsMovieWatchListed(watchlistData.isWatchListed);
      } catch (error) {
        console.error("Error fetching movie status:", error);
      }
    };

    fetchMovieStatus();
  }, [user?.sub, id]); // Run when `user.sub` or `id` changes


  
  const addToFavorite = async () => {
  try {
    const cleanedMovie = {
      id: data.id,
      title: data.original_title,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      addedAt: new Date().toISOString(),
    };

    const response = await fetch(`https://filmpire-backend.onrender.com/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.sub,
        movie: cleanedMovie,
      }),
    });
    
    console.log("User Payload:", user?.sub);
    
    const data1 = await response.json();

    setIsMovieFavorited(prev => !prev);  // toggle UI state
  } catch (error) {
    console.error('Error adding to favorites mmovieinformation:', error);
  }
};


///////////////////////////
const removeFavorite = async () => {
  const userId = user?.sub;
  const movieId = id;
  try {
    const response = await fetch(`https://filmpire-backend.onrender.com/favorites/${userId}/${movieId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove favorite');
    }

    const data = await response.json();
    console.log('Updated favorites:', data.favorites);
    setIsMovieFavorited(prev => !prev);  // toggle UI state


  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};





const addToWatchList = async () => {
  try {
    const cleanedMovie = {
      id: data.id,
      title: data.original_title,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      addedAt: new Date().toISOString(),
    };
    console.log("watchList movies",cleanedMovie);

    const response = await fetch('https://filmpire-backend.onrender.com/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.sub,
        movie: cleanedMovie,
      }),
    
    });
    const data1 = await response.json();
    console.log('Watchlist updated:', data1);
    setIsMovieWatchListed(prev => !prev);  // toggle UI state
  } catch (error) {
    console.error('Error adding to watchlist:', error);
  }
};

const removeWatchList = async () => {
const userId = user?.sub;
const movieId = id;
try {
const response = await fetch(`https://filmpire-backend.onrender.com/watchlist/${userId}/${movieId}`, {
  method: 'DELETE',
});

if (!response.ok) {
  throw new Error('Failed to remove watchlist');
}

const data = await response.json();
console.log('Updated watchlist:', data.favorites);
setIsMovieWatchListed(prev => !prev);  // toggle UI state


} catch (error) {
console.error('Error removing watchlist:', error);
}
};


  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="6rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong, Go Back</Link>
      </Box>
    );
  }
  

  return (
    <ContainerSpaceAround container>
    <Grid size={{sm:12,lg:4}}>
      <PosterContainer>
      <Poster
      src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title}
    />
    </PosterContainer>
    </Grid>

    <Grid direction ="column" size={{lg:7}}>
    <Typography component="div" variant="h3" align="center" gutterBottom>
      <Typography component="span" variant="h3">{data?.title} ({data.release_date.split('-')[0]})</Typography>
    </Typography>
    <Typography component="div" variant="h5" align="center" gutterBottom>
      <Typography component="span" variant="h5">{data?.tagline}</Typography>
      </Typography>

      <ContainerSpaceAround>
      <Grid   style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{display:"flex", align:"center"}}>
        <Rating readOnly value={data.vote_average/2}/>
        <Typography component="div" variant="subtitle1" gutterBottom style={{marginLeft: '20px'}}> 
          <Typography  component="span" variant="subtitle1"> {Number(data?.vote_average).toFixed(1)}/10</Typography>
          
          </Typography>
        </Box>

        <Typography component="div" variant="h6" align="center" gutterBottom style={{marginLeft: '50px'}}>
          <Typography component="span" variant="h6">{data?.runtime}min | Language: {data?.spoken_languages[0].name}</Typography>
          
        </Typography>
      </Grid>
      </ContainerSpaceAround>
      <Grid  >
      <GenreContainer>
        {data?.genres?.map((genre)=>(
        
          <Links key={genre.name} to="/" onClick={() =>dispatch(selectGenreOrCategory(genre.id)) }>
             <GenreImage src={genreIcons[genre.name.toLowerCase()]} height={30}/>
             <Typography component="div" color="textPrimary" variant="subtitle1">
              <Typography  variant="subtitle1" component="span" >{genre?.name}</Typography>
              </Typography>
          </Links>
          
        ))}
      </GenreContainer>
      </Grid>
      <Typography component="div" variant="h5" gutterBottom style={{marginTop:'10px'}}> 
              <Typography  variant="h5" component="span" >Overview</Typography>
        
         </Typography>

      <TextContainer>

      <Typography component="div" style={{marginBottom:'2rem', flexWrap:'wrap'}}>
              <Typography  component="span" >{data?.overview}</Typography>

        
      </Typography>
      </TextContainer>

      <Typography component="div" variant="h5" gutterBottom>
              <Typography   variant="h5" component="span" >Top Cast</Typography>
        
        </Typography>
      <Grid   container spacing={2}>
        {data && data.credits?.cast?.map((character,i)=>(
          character.profile_path && (
            
          <Grid key={i}  size={{xs:6, md:2}} component={Link} to={`/actors/${character.id}`} style={{textDecoration:'none',  }}>
            <CastImages  src={ `https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name}/>
            <Typography component="div" color="textPrimary" style={{ wordWrap: 'break-word',maxWidth: '120px'}}>
              <Typography  component="span" >{character?.name}</Typography>
              
           
              
              </Typography>
            <Typography component="div" color="textSecondary" style={{ wordWrap: 'break-word',maxWidth: '110px'}}>
              <Typography  component="span" >{character.character.split('/')[0]}</Typography>
              
              
              
              </Typography>
          </Grid>
          ) 
        )).slice(0,6)}
      </Grid>

      <Grid   container style={{marginTop:'2rem'}}>
        <div>
        <ButtonContainer>
          
        <Grid size={{xs:12, sm:6}} sx={{ marginRight: '150px' }}>
          <ButtonGroup size="small" variant="outlined">
          <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language /> } style={{ fontSize: '16px' }}>Website</Button>
          <Button target="_blank" rel="noopener noreferrer" href={`httpS://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />} style={{ fontSize: '16px' }}>IMDB</Button>
          <Button onClick={()=>setOpen(true)}  endIcon={<Theaters />} style={{ fontSize: '16px' }}>Trailer</Button>
          </ButtonGroup>
        </Grid>
        

        <Grid size={{xs:12, sm:6}}>
          <ButtonGroup size="small" variant="outlined">
          <Button onClick={!isMovieFavorited ? addToFavorite : removeFavorite} endIcon={isMovieFavorited ? <FavoriteBorderOutlined/> : <Favorite/>} style={{ fontSize: '16px' }}>{isMovieFavorited ? 'UnFavorite' : 'Favorite'}</Button>

          <Button onClick={!isMovieWatchListed ? addToWatchList : removeWatchList} endIcon={isMovieWatchListed ? <Remove/> : <Add/>} style={{ fontSize: '16px' }}>Watchlist</Button>

          <Button endIcon={<ArrowBack/>} sx={{borderColor: 'primary.main'}} style={{ fontSize: '16px' }}>
          <Typography sx={{textDecoration:'none'}} component={Link} to="/" color="inherit" variant="subtitle1">
          Back
          </Typography>
          </Button>
          </ButtonGroup>
        </Grid>
        </ButtonContainer>
      </div>
      </Grid>
    </Grid>

    <Box marginTop="5rem" width='100%'>
        <Typography variant="h3" gutterBottom align="center"> You might also like</Typography>
        {recommendations? <MovieList movies={recommendations} numberOfMovies={12}/>: <Box> Sorry, nothing was found</Box>}
    </Box>
       

 <Modals
  closeAfterTransition
  open={open}
  onClose={() => setOpen(false)}
>
  {data?.videos?.results?.length > 0 && (
    // Prioritize "Official Trailer" first, fallback to "Trailer"
    (() => {
      const trailerVideo =
        data.videos.results.find(video =>
          video.name.toLowerCase().includes("official trailer")
        ) ||
        data.videos.results.find(video =>
          video.name.toLowerCase().includes("trailer")
        );

      return trailerVideo ? (
        <Videos
          autoPlay
          frameBorder="0"
          title={trailerVideo.name}
          src={`https://www.youtube.com/embed/${trailerVideo.key}`}
          allow="autoplay"
        />
      ) : (
        <Typography variant="h6" alignItems="center" justifyContent="center">
          No trailer available.
        </Typography>
      );
    })()
  )}
</Modals>
{/* <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages}/> */}
</ContainerSpaceAround>
  );
};

export default MovieInformation;