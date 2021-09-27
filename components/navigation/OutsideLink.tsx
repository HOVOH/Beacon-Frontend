import React from "react";
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import LaunchIcon from '@material-ui/icons/Launch';

interface IOutsideLinkProps extends PropsWithClassName{
  href: string,
  noIcon?: boolean,
  color?: "light"|"primary"
}

const useStyle = makeStyles((theme: Theme) => ({
  link: {
    ...theme.typography.body1,
    textAlign: "center",
    display: "inline flex",
    alignItems: 'center',
    transition: `color ${theme.transitions.easing.easeOut} 0.1s`
  },
  primary: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark
    },
  },
  light: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.disabled
    },
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
      className={classBag(classes.link, classes[props.color??"primary"], props.className)}
      target={"_blank"}>
      {props.children}
      {!props.noIcon &&(
        <span className={classes.icon}>
          <LaunchIcon fontSize={"small"}/>
        </span>
      )}
    </a>
);
}
