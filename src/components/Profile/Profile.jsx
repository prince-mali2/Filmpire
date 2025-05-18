import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Typography,Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import {useGetListQuery } from "../../services/TMDB";
import { RatedCards } from '..';

import { userSelector } from '../../features/auth';

const Profile = () => {
    const {user} = useSelector((state)=>state.user);

    const {data:favoriteMovies, refetch: refetchFavorites} = useGetListQuery({listname: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page:1});
      
    const {data:watchListMovies, refetch: refetchWatchlisted} = useGetListQuery({listname: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page:1});
    
    useEffect(()=>{
      refetchFavorites();
      refetchWatchlisted();
    },[])
    const logout= ()=>{
      localStorage.clear();
      window.location.href='/';
    }

  return (
   <Box>
    <Box display="flex" justifyContent="space-between">
      <Typography variant='h4'style={{marginLeft:'30px',marginTop:'10px'}}>My Profile</Typography>
      <Button color="inherit" onClick={logout}>Logout &nbsp; <ExitToApp/> </Button>

    </Box>
    {!favoriteMovies?.results?.length && !watchListMovies?.results?.length
    ? <Typography variant='h5'>Add favourite Movies or watchlist some movies to see them here!</Typography> 
    :( <Box>
      <RatedCards title="Favorite Movies" data={favoriteMovies}/>
      <RatedCards title="WatchList" data={watchListMovies}/>

      </Box>
    )}
   </Box>
  );
}

export default Profile;