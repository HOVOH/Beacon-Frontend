import merge from 'deepmerge'
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface BeaconThemeOptions {
  gradients: {
    primary: string,
  }
}

export type BeaconTheme = Theme & BeaconThemeOptions

const shadows: string[] = new Array(25);
for (let i = 0; i<25; i++){
  shadows[i] = `0 ${i}px ${i}px 0 rgba(0,0,0,.05)`
}

export const commonTheme: BeaconTheme = {
  shape: {
    borderRadius: 10,
  },
  // @ts-ignore
  shadows,
  typography: {
    fontFamily: "Poppings, Roboto, Helvetica, Arial, sans-serif"
  }
}

export const mergeBaseTheme = (theme: BeaconTheme) => merge(commonTheme, theme);
