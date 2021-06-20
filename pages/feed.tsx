import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Title } from "../components/typography/Title";
import Feed from "../components/feed/Feed";

const useStyle = makeStyles(theme => ({
  root: {
    height: "100%"
  }
}))

export default function FeedPage(props:any) {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Title>Feed</Title>
      <Feed/>
    </Box>
  )
}
