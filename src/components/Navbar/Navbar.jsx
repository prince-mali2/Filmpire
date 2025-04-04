import React,{useState} from 'react';
import { AppBar, Toolbar as MuiToolbar, IconButton as MuiIconButton, useMediaQuery, IconButton, Avatar,Button, Drawer } from '@mui/material';
import {Link} from 'react-router-dom';
import { Menu, Brightness7,Brightness4,AccountCircle } from '@mui/icons-material';
import useStyles from './styles';
import { useTheme } from '@emotion/react';
import {Sidebar} from '..';

const Navbar = () => {
  const [mobileOpen,setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px');
  const theme = useTheme();
  const isAuthenticated=true;

  return (
    <>
    
    <AppBar position="fixed">
      <classes.Toolbar as={MuiToolbar}>
        {isMobile &&(
          <classes.MenuButton as={MuiIconButton} color="inherit" edge="start"
          onClick={()=>setMobileOpen((prevMobileOpen)=>!prevMobileOpen)}>
            <Menu />
          </classes.MenuButton>
        )}

        <IconButton color="inherit" sx={{ml:1}} onClick={()=>{}}>
          {theme.palette.mode === 'dark'? <Brightness7/> : <Brightness4/>}
        </IconButton>

        {!isMobile && 'Search...'}
        
        <div>
        {!isAuthenticated ?(
          <Button color="inherit" onClick={()=>{}}>Login &nbsp; <AccountCircle/></Button>
        ):(
          <Button
          color="inherit"
          component ={Link}
          to ="/profile/:id"
          className = {classes.linkButton}
          onClick={()=>{}}
          >
            {!isMobile && <>My movies  &nbsp;</>}
            <Avatar
            style={{width:30, height:30}}
            alt="profile"
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            />
          </Button>
        )}
        </div>
        {isMobile && 'Search...'}

      </classes.Toolbar>
    </AppBar>


//SiDEBAR
<div>
<nav className={classes.drawer}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={()=>setMobileOpen((prevMobileOpen)=>!prevMobileOpen)}
            classes ={{paper: classes.drawerPaper}}
            // className ={classes.drawerPaper}
            ModalProps={{keepMounted:true}}
          >
            <Sidebar setMobileOpen={setMobileOpen}/>
          </Drawer>
        ):(
          <Drawer classes ={{paper: classes.drawerPaper}} variant="permanent"  open>
            <Sidebar setMobileOpen={setMobileOpen}/>
          </Drawer>
        )}
</nav>
</div>
</>
  );
};

export default Navbar;
