import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#33b6d0"
        },
        secondary: {
            main: "#fbf3e5"
        }
    }
});

document.documentElement.style.setProperty('--color-primary', theme.palette.primary.main);
document.documentElement.style.setProperty('--color-secondary', theme.palette.secondary.main);
document.documentElement.style.setProperty('--color-error', theme.palette.error.main);

export default function Layout() {
    return (
        <ThemeProvider theme={theme}>
            <Outlet />
        </ThemeProvider>
    );
}
