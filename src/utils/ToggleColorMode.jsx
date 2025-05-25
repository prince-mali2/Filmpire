// import React, { useState, useMemo, createContext } from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// export const ColorModeContext = createContext();

// const ToggleColorMode = ({ children }) => {
//   const [mode, setMode] = useState('light');

//   const toggleColorMode = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode]
//   );

//   return (
//     <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
//       <ThemeProvider theme={theme}>{children}</ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default ToggleColorMode;


import React, { useState, useEffect, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  // Initialize mode from localStorage or fallback to 'light'
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');

  // Update localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  // Toggle between light and dark modes
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;

