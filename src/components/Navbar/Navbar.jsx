import { useState,useEffect, useContext } from 'react';
import { AppBar, IconButton, Avatar, Button, useMediaQuery,Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import {  Brightness7, Brightness4, AccountCircle } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { Sidebar,Search } from '..';
import { useDispatch } from 'react-redux';
import {ColorModeContext} from '../../utils/ToggleColorMode';
import { setUser } from '../../features/auth';
import {  createSessionId, moviesApi } from '../../utils';
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';




import { Toolbar, MenuButton, DrawerStyled,MaterialUISwitch } from './styles'; // Importing styled components


const settings = ['My Profile', 'Logout'];


const Navbar = () => {
  
    const [menuOpen, setMenuOpen] = useState(false); // Replacing anchorElUser

    const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuAction = (setting) => {
    if (setting === 'My Profile') {
      window.location.href = '/profile'; // Navigate to profile
    } else if (setting === 'Logout') {
      logout({ returnTo: window.location.origin }); // Auth0 logout
    }
    setMenuOpen(false); // Close the menu
  };


  
  const {user, loginWithRedirect,isAuthenticated,logout} = useAuth0();
  // const { isAuthenticated, user} = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const dispatch = useDispatch();

  const colorMode = useContext(ColorModeContext);
  // console.log(user);
  

  useEffect(()=>{
    const logInUser = async()=>{
      if(token){
        if(sessionIdFromLocalStorage){
            // console.log(1);
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
          dispatch(setUser(userData));

        }else{
          // console.log(2);
          const sessionId = await createSessionId();
          const {data: userData}= await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  },[token, dispatch, sessionIdFromLocalStorage]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <MenuButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <MenuIcon/>
            </MenuButton>
          )}

      
          {/* <MaterialUISwitch color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} >{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}</MaterialUISwitch> */}
          <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
            <MaterialUISwitch
              color="inherit"
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              checked={theme.palette.mode === 'dark'} // Bind switch state to theme mode
            >
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </MaterialUISwitch>
          </Tooltip>


          {!isMobile && <Search/>}

          
          {!isAuthenticated ? (
            <Button color="inherit" onClick={(e) => loginWithRedirect()}>
                Login &nbsp; <AccountCircle />
              </Button>
          ):(
            
             <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleMenuToggle} sx={{ p: 0 }}>
                  <Avatar alt={user?.name} src={user?.picture} />
                </IconButton>
              </Tooltip>
              {menuOpen && (
                <Menu
                  sx={{ mt: '45px' }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={menuOpen}
                  onClose={() => setMenuOpen(false)}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleMenuAction(setting)}>
                      <Typography>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Box>
           
          )}

{isMobile && <Search/>}

</Toolbar>
</AppBar>
      {/* Sidebar */}
      <nav>
        {isMobile ? (
          <DrawerStyled
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen((prev) => !prev)}
            ModalProps={{ keepMounted: true }}
          >
            <Sidebar setMobileOpen={setMobileOpen} />
          </DrawerStyled>
        ) : (
          <DrawerStyled
            variant="permanent"
            open
          >
            <Sidebar setMobileOpen={setMobileOpen} />
          </DrawerStyled>
        )}
      </nav>
    </>
  );
};

export default Navbar;
