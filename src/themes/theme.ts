import { createTheme } from "@mui/material/styles";
import {grey, orange, lightGreen} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900], // Основной цвет 1 (например, серый)
        },
        success: {
            main: lightGreen[500], // Основной цвет 2 (например, светло-зеленый)
        },
        error: {
            main: orange[500], // Основной цвет 3 (например, оранжевый)
        },
    },
});

export default theme;