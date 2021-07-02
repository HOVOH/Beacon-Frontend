import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Title } from "../typography/Title";
import { Subtitle } from "../typography/Subtitle";


const useStyle = makeStyles(theme => ({
  wrapper: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius
  }
}));

export interface ServiceUnavailableProps {
  title?: string
}

export function ServiceUnavailable(props: ServiceUnavailableProps){
  const classes = useStyle();

  return (
    <Box className={classes.wrapper}>
      <Title>{props.title??"Service currently unavailable"}</Title>
      <Subtitle>Try again later</Subtitle>
    </Box>
  )
}
