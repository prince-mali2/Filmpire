import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Provider} from 'react-redux';
import store from './app/store';
import App from './App';
import ToggleColorModeProvider from './utils/ToggleColorMode';

// const theme = createTheme(); // Create the theme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ToggleColorModeProvider>
      <CssBaseline /> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
    </Provider>
  </React.StrictMode>
);
