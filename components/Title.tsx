import React, { PropsWithChildren } from "react";
import { PropsWithClassName } from "../utils/classBag";
import { Typography } from "@material-ui/core";

export interface TitleProps extends PropsWithChildren<PropsWithClassName> {

}

export function Title(props: TitleProps){
  return (<Typography variant={"h3"} component={"h1"} className={props.className}>{props.children}</Typography>);
}
