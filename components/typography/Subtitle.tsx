import React, { PropsWithChildren } from "react";
import { PropsWithClassName } from "../../utils/classBag";
import { Typography } from "@material-ui/core";

export function Subtitle(props: PropsWithChildren<PropsWithClassName>){
  return (<Typography variant={"h4"} color={"textSecondary"} className={props.className}>{props.children}</Typography>)
}
