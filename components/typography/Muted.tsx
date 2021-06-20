import React, { PropsWithChildren } from "react";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import { makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.hint,
  }
}))

export function Muted(props: PropsWithChildren<PropsWithClassName>){
  const classes = useStyle();
  return (
    <Typography
      component={"span"}
      className={classBag(classes.root, props.className)}>
      {props.children}
    </Typography>
  )
}
