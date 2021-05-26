import { BeaconTheme, mergeBaseTheme } from "./common";

export const lightTheme: BeaconTheme = mergeBaseTheme({
  palette: {
    type: "light",
    background: {
      default: "#f8f9fa"
    },
    text:{
      primary: "#252f40",
      secondary: "#67748e"
    }
  }
})
