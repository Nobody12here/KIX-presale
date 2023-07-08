import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: 'Space Grotesk, sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: "white",
        inputProps: {
          style: {
            color: "#160033" // This sets the text field font color
          }
        }
      }
    },
});

const MyComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <TextField label="Username" variant="outlined" />
    </ThemeProvider>
  );
};

export default MyComponent;
