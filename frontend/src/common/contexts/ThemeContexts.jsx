import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeContextProvider = ({ children }) => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Poppins",
        "Arial",
        "Roboto",
        "'Helvetica Neue'",
        "sans-serif",
      ].join(","),
    },
    shape: {
      borderRadius: 12,
    },
    palette: {
      primary: {
        main: "#FD6637",
        contrastText: "#FFFFFF",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
