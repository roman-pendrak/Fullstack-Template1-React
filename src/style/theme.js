import { createTheme } from "@mui/material/styles";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#242424", // Your primary color
    },
    secondary: {
      main: "#11337a", // Your secondary color
    },
  },
  typography: {
    fontFamily: "Fira Sans, sans-serif",
  },
});

export default theme;
