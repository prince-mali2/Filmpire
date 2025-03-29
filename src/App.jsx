import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import {Actors, MovieInformation, Movies , Navbar,Profile } from './components';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <main>
        <Routes>
          <Route path="/movies/:id" element={<MovieInformation/>} />

          <Route path="/actors/:id" element={<Actors/>} />

          <Route path="/" element={<Movies/>} />

          <Route path="/profile/:id" element={<Profile/>} />
        </Routes>
      </main>
    </div> 
  );
};

export default App;
