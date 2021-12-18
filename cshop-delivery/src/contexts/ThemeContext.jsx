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
        borderRadius: 15,
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
