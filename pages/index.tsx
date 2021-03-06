import Head from 'next/head'
import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Title } from "../components/typography/Title";
import { Subtitle } from "../components/typography/Subtitle";
import { BeaconTheme } from "../theme/common";
import { useCredentials } from "../components/providers/AuthenticationProvider";

const useStyle = makeStyles((theme: BeaconTheme) => ({
  wrapper: {
    background: theme.gradients.primary,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius
  },
  starter: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius
  }
}));

export default function Home() {

  const classes = useStyle();
  const {isAuthenticated} = useCredentials();

  return (
    <>
      <Head>
        <title>Beacon App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Box className={classes.wrapper}>
          <Title>Welcome to the Beacon Project</Title>
          <Typography>Shine light on unknown projects</Typography>
        </Box>
        <Box className={classes.starter} mt={2}>
          {isAuthenticated()?(
            <Typography>You can curate tweets imported or import new users' tweets by searching for a user and clicking the import button</Typography>
          ):(
            <Typography>Start by logging in with Metamask.</Typography>
          )}
        </Box>
      </Box>
    </>
  )
}
