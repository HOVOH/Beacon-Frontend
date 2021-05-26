import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Title } from "../Title";
import { useRouter } from "next/router";


const useStyle = makeStyles(theme => ({
  wrapper: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius
  }
}));

export interface NotFoundProps {
  title?: string
}

export function NotFound(props: any){
  const classes = useStyle();
  const router = useRouter()

  return (
    <Box className={classes.wrapper}>
      <Title>{props.title??"Not found"}</Title>
      <Button onClick={()=> router.back()} variant={"contained"} color={"primary"}>Back</Button>
    </Box>
  )
}
