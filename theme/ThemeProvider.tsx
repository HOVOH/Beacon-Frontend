import React, { useContext, useState } from 'react';
import { AvailableThemes, themes } from "./theme";
import { CssBaseline, ThemeProvider } from '@material-ui/core';

const ThemeContext = React.createContext({});

export default function BeaconThemeProvider(props: any) {
  let currentTheme = "dark" as AvailableThemes

  const [palette, setPalette] = useState<AvailableThemes>( currentTheme? currentTheme:"light");

  const setDarkPalette = () => {
    setPalette("dark");
  }

  const setLightPalette = () => {
    setPalette("light");
  }

  const isDark = () => palette === "dark";

  const isLight = () => palette === "light";

  const getTheme = () => themes[palette]

  return (
    <ThemeContext.Provider value={{ palette, setDarkPalette, setLightPalette, isDark, isLight, getTheme }}>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext);
}
