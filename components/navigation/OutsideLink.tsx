import React from "react";
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import LaunchIcon from '@material-ui/icons/Launch';

interface IOutsideLinkProps extends PropsWithClassName{
  href: string
}

const useStyle = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    ...theme.typography.body1,
    "&:hover": {
      color: theme.palette.primary.dark
    },
    textAlign: "center"
  },
  icon: {
    marginLeft: theme.spacing(0.5),
  }
}))

export function OutsideLink(props: React.PropsWithChildren<IOutsideLinkProps>){
  const classes = useStyle();
  return (
    <a
      href={props.href}
      rel="nofollow noopener"
      className={classBag(classes.link, props.className)}
      target={"_blank"}>
      {props.children}
      <span className={classes.icon}>
        <LaunchIcon fontSize={"small"}/>
      </span>
    </a>
);
}
