import { createMuiTheme } from "@material-ui/core";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export type AvailableThemes = "light" | "dark" ;

export const themes = {
  dark: createMuiTheme(darkTheme),
  light: createMuiTheme(lightTheme)
}
