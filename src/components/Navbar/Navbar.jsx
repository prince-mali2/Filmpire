import React, { useState,useEffect } from 'react';
import { AppBar, IconButton, Avatar, Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu, Brightness7, Brightness4, AccountCircle } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { Sidebar,Search } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import { fetchToken, createSessionId, moviesApi } from '../../utils';

import { Toolbar, MenuButton, DrawerStyled, DrawerPaper, LinkButton } from './styles'; // Importing styled components

const Navbar = () => {
  const { isAuthenticated, user} = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const dispatch = useDispatch();

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
              <Menu />
            </MenuButton>
          )}

          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search/>}

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkButton
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
              >
                {!isMobile && <>My movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </LinkButton>
            )}
          </div>

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
