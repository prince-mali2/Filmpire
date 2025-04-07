import React, { useState } from 'react';
import { AppBar, IconButton, Avatar, Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu, Brightness7, Brightness4, AccountCircle } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { Sidebar,Search } from '..';
import { Toolbar, MenuButton, DrawerStyled, DrawerPaper, LinkButton } from './styles'; // Importing styled components

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

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
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkButton
                color="inherit"
                component={Link}
                to="/profile/:id"
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
