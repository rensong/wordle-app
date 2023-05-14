import { createTheme } from '@mui/material/styles';

export const Colors: Record<string, string> = {
  yellow: "#c9b458",
  green: "#6baa64",
  darkGrey: "#787c7e",
  borderGrey: "#d3d6da",
  keyGrey: "#d3d6da",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: "#787c7e"
    }
  },
});
