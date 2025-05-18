// App.js
import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Actors, MovieInformation, Movies, Navbar, Profile } from './components';
import { Root, Content, ToolbarSpacer } from './styles'; // ⬅️ updated import

// const theme = createTheme();

const App = () => {
  return (
    // <ThemeProvider theme={theme}>
      <Root>
        <CssBaseline />
        <Navbar />
        <Content>
          <ToolbarSpacer /> {/* Spacer for Navbar */}
          <Routes>
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/" element={<Movies />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Content>
      </Root>
    // </ThemeProvider>
  );
};

export default App;
