import {createTheme, Theme} from "@mui/material/styles";

// interface Palette {
//     orange:
//         {
//             main: string,
//             light
//                 :
//                 string,
//             dark
//                 :
//                 string,
//             contrastText
//                 :
//                 string,
//         }
// }

const defaultTheme: Theme
    = createTheme({
    palette: {
        orange: {
            main: "#FFA500",
            light: "#E6A200",
            dark: "#FF8C00",
            contrastText: "#242105",
        },
        background: {
            default: "orange",

        },

    },
});

export default defaultTheme;