import { BeaconTheme, mergeBaseTheme } from "./common";

export const darkTheme: BeaconTheme = mergeBaseTheme({
  palette: {
    type: "dark",
    background: {
      default: "#05001A",
      paper: "#100C21",
    },
    text: {
      primary: "#FFFBEB",
      secondary: "#FFE0A3"
    },
    primary: {
      main: "#F0905F",
      dark: "#ea6b2c",
    },
    secondary: {
      main: "#C53E85"
    }
  },
  gradients: {
    primary: "linear-gradient(45deg, #F0905F, #C53E85)",
  },
})
