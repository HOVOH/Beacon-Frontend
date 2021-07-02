import React from 'react';
import { PropsWithClassName } from "../../utils/classBag";
import { NotFound } from "./NotFound";
import { ServiceUnavailable } from "./ServiceUnavailable";
import { Box, Button, makeStyles } from "@material-ui/core";
import { Title } from "../typography/Title";

const useStyle = makeStyles(theme => ({
  wrapper: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius
  }
}));

export interface IRequestErrorProps extends PropsWithClassName{
  error: any;
  resource: string;
}

export function ErrorBox(props: IRequestErrorProps){
  const classes = useStyle();
  const {error, resource} = props;
  const response = error.response;
  if (response.status === 404){
    return(<NotFound title={`${resource} not found`}/>)
  } else if (response.status === 502) {
    return (<ServiceUnavailable/>)
  }
  return (
    <Box className={classes.wrapper}>
      <Title>{"An unexpected error occurred"}</Title>
    </Box>
  )
}
