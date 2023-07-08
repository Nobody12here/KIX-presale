import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme,ThemeProvider } from '@mui/material/styles';
//Import it from your react index.js file
import { BrowserRouter} from 'react-router-dom';


import App from './App.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: 'Space Grotesk, sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: "primary",
        inputProps: {
          style: {
            color: "#fff" // This sets the text field font color
          }
        },
      }
    }
  }
});

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>   
      <App/>
    </ThemeProvider>
  </StrictMode>
);
