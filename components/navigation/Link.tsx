import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import React from "react";
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { classBag } from "../../utils/classBag";

export interface ILink {
  href: string,
  name: string,
}

interface ILinkProps {
  className?: string,
}

export type LinkProps = ILinkProps & NextLinkProps;

const useStyle = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    ...theme.typography.body1,
    "&:hover": {
      color: theme.palette.primary.dark
    }
  }
}))

export function Link(props: React.PropsWithChildren<LinkProps>){
  const classes = useStyle();
  return (
    <NextLink { ...props }>
        <a className={classBag(classes.link, props.className)}>
          {props.children}
        </a>
    </NextLink>
  );
}
