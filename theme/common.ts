import merge from 'deepmerge'
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface IBeaconThemeOptions {
  gradients: {
    primary: string,
  }
}

type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
      T[P];
};

export type BeaconThemeOptions = RecursivePartial<BeaconTheme> & RecursivePartial<IBeaconThemeOptions>

export type BeaconTheme = Theme & IBeaconThemeOptions

const shadows: string[] = new Array(25);
for (let i = 0; i<25; i++){
  shadows[i] = `0 ${i}px ${i}px 0 rgba(0,0,0,.05)`
}

export const commonTheme: BeaconThemeOptions = {
  shape: {
    borderRadius: 10,
  },
  // @ts-ignore
  shadows,
  typography: {
    fontFamily: "Poppings, Roboto, Helvetica, Arial, sans-serif"
  }
}

export const mergeBaseTheme = (theme: BeaconThemeOptions) => merge(commonTheme, theme);
