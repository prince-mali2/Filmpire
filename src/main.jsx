import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Provider} from 'react-redux';
import store from './app/store';
import App from './App';
import ToggleColorModeProvider from './utils/ToggleColorMode';
import { Auth0Provider } from '@auth0/auth0-react';


// const theme = createTheme(); // Create the theme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider 
    domain="filmpire.us.auth0.com"
    clientId="QDIzhpaSQz5W1SgBvICltMAgVUGmDubN"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <Provider store={store}>
    <ToggleColorModeProvider>
      <CssBaseline /> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
    </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
