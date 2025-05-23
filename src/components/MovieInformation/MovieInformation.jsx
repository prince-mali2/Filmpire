import React , {useState,useEffect} from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Remove,
  Add,
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined
  
} from "@mui/icons-material";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { tmdbApi, useGetMovieQuery,useGetRecommendationQuery,useGetListQuery } from "../../services/TMDB";
import { ContainerSpaceAround, Poster,PosterContainer,GenreContainer,GenreImage,Links,TextContainer,CastImages,ButtonContainer,Modals,Videos } from "./styles";
import genreIcons from '../../assets/genres';
import {selectGenreOrCategory} from '../../features/currentGenreOrCategory';
import {MovieList, Pagination} from '../';
import { userSelector } from "../../features/auth";





const MovieInformation = () => {
  const {user} = useSelector(userSelector);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  
  const { data, isFetching, error } = useGetMovieQuery(id);

  const {data:favoriteMovies} = useGetListQuery({listname: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page:1});

  const {data:watchListMovies} = useGetListQuery({listname: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page:1});

  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationQuery({list:'recommendations', movie_id:id});
 

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  useEffect(()=>{
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie)=> movie?.id===data?.id));
  },[favoriteMovies,data]);
  useEffect(()=>{
    setIsMovieWatchListed(!!watchListMovies?.results?.find((movie)=> movie?.id===data?.id));
  },[watchListMovies,data])

  
  const addToFavorite =async()=>{
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
      media_type:'movie',
      media_id:id,
      favorite:!isMovieFavorited,
    });
    setIsMovieFavorited((prev)=>!prev);

  };
  

   const addToWatchList =async()=>{
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
      media_type:'movie',
      media_id:id,
      watchlist:!isMovieWatchListed,
    });
    setIsMovieWatchListed((prev)=>!prev);
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

    <Grid   direction ="column" size={{lg:7}}>
    <Typography variant="h3" align="center" gutterBottom>
      {data?.title} ({data.release_date.split('-')[0]})
    </Typography>
    <Typography variant="h5" align="center" gutterBottom>
      {data?.tagline}
      </Typography>

      <ContainerSpaceAround>
      <Grid   style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{display:"flex", align:"center"}}>
        <Rating readOnly value={data.vote_average/2}/>
        <Typography variant="subtitle1" gutterBottom style={{marginLeft: '20px'}}> {Number(data?.vote_average).toFixed(1)}/10</Typography>
        </Box>

        <Typography variant="h6" align="center" gutterBottom style={{marginLeft: '50px'}}>
          {data?.runtime}min | Language: {data?.spoken_languages[0].name}
        </Typography>
      </Grid>
      </ContainerSpaceAround>
      <Grid  >
      <GenreContainer>
        {data?.genres?.map((genre)=>(
        
          <Links key={genre.name} to="/" onClick={() =>dispatch(selectGenreOrCategory(genre.id)) }>
             <GenreImage src={genreIcons[genre.name.toLowerCase()]} height={30}/>
             <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
          </Links>
          
        ))}
      </GenreContainer>
      </Grid>
      <Typography variant="h5" gutterBottom style={{marginTop:'10px'}}> Overview </Typography>

      <TextContainer>

      <Typography style={{marginBottom:'2rem', flexWrap:'wrap'}}>
        {data?.overview}
      </Typography>
      </TextContainer>

      <Typography variant="h5" gutterBottom>Top Cast</Typography>
      <Grid   container spacing={2}>
        {data && data.credits?.cast?.map((character,i)=>(
          character.profile_path && (
            
          <Grid key={i}  size={{xs:6, md:2}} component={Link} to={`/actors/${character.id}`} style={{textDecoration:'none',  }}>
            <CastImages  src={ `https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name}/>
            <Typography color="textPrimary" style={{ wordWrap: 'break-word',maxWidth: '120px'}}>{character?.name}</Typography>
            <Typography color="textSecondary" style={{ wordWrap: 'break-word',maxWidth: '110px'}}>{character.character.split('/')[0]}</Typography>
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
          <Button onClick={addToFavorite} endIcon={isMovieFavorited ? <FavoriteBorderOutlined/> : <Favorite/>} style={{ fontSize: '16px' }}>{isMovieFavorited ? 'UnFavorite' : 'Favorite'}</Button>

          <Button onClick={addToWatchList} endIcon={isMovieWatchListed ? <Remove/> : <Add/>} style={{ fontSize: '16px' }}>Watchlist</Button>

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