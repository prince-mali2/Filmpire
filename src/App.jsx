import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import useStyles from './styles';
import { Actors, MovieInformation, Movies, Navbar, Profile } from './components';

const theme = createTheme();

const App = () => {
  const classes = useStyles(); 

  return (
   
      <div className={classes.Root}>
        <CssBaseline />
        <Navbar />
        <classes.Content>
          <classes.Toolbar /> {/* Spacer for Navbar */}
          <Routes>
            <Route path="/movies/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/" element={<Movies />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </classes.Content>
      </div>
    
  );
};

export default App;
