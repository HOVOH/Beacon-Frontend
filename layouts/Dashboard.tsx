import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BeaconThemeProvider from "../theme/ThemeProvider";
import { BeaconWeb3Provider } from "../components/providers/BeaconWeb3Provider";
import { injected } from "../chain/connectors";
import { useWeb3React } from "@web3-react/core";

const useStyle = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "150px 1fr",
    gridTemplateRows: "60px 1fr",
  },
  logo: {
    gridColumn: "1/1",
    gridRow: "1/1",
    alignSelf: "center",
  },
  topBar: {
    gridColumn: "2/2",
    gridRow: "1/1",
    alignSelf: "center"
  },
  navigation: {
    gridColumn: "1/1",
    gridRow: "2/2",
  },
  main: {
    gridColumn: "2/2",
    gridRow: "2/2",
    display: "flex",
    alignItems: "stretch",
    "& > *": {
      flexGrow: 1
    }
  }
}))

export interface IDashboardProps{
  navigation?: React.ReactNode,
  topBar?: React.ReactNode,
  main: React.ReactNode,
}

export function Dashboard(props: IDashboardProps){
  const classes = useStyle();

  return(
    <BeaconThemeProvider>
      <Box display={"flex"} p={2} className={classes.wrapper}>
        <CssBaseline />
        <Box className={classes.logo}>
          <Typography variant={"h5"}>Beacon</Typography>
        </Box>
        {props.navigation && (
          <Box flexGrow={0} pr={2} pt={2} className={classes.navigation}>
            {props.navigation}
          </Box>
        )}
        {props.topBar && (
          <Box className={classes.topBar}>
            {props.topBar}
          </Box>
        )}
        <main className={classes.main}>
          {props.main}
        </main>
      </Box>
    </BeaconThemeProvider>
  )
}
