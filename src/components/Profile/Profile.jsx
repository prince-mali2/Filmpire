import {useEffect,useState} from 'react';
// import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
// import { ExitToApp } from '@mui/icons-material';
// import {useGetListQuery } from "../../services/TMDB";
import { RatedCards } from '..';
// import { userSelector } from '../../features/auth';
import axios from 'axios';

import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
      const {user} = useAuth0();
      // console.log(user);
      // console.log(user.name);


      
      const [favorites, setFavorites] = useState([]);
      const [watchlist, setWatchlist] = useState([]);
      const [loading, setLoading] = useState(true);


useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`https://filmpire-backend.onrender.com/profile/${user?.sub}`);
        setFavorites(response.data.favorites);
        setWatchlist(response.data.watchlist);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.sub]);

    console.log("favorites",favorites);
    console.log("Watchlists",watchlist);

  return (
   <Box>
    <Box display="flex" justifyContent="space-between">
      <Typography variant='h4'style={{marginLeft:'30px',marginTop:'10px'}}>My Profile</Typography>
      {/* <Typography variant='h5'>{user.name}</Typography> */}

    </Box>
    {!favorites?.length && !watchlist?.length
    ? <Typography variant='h5'>Add favourite Movies or watchlist some movies to see them here!</Typography> 
    :( <Box>
      <RatedCards title="Favorite Movies" data={favorites}/>
      <RatedCards title="WatchList" data={watchlist}/>

      </Box>
    )}
   </Box>
  );
}

export default Profile;