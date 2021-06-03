import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { ILink, Link } from "./Link";
import { classBag } from "../../utils/classBag";
import { useRouter } from 'next/router'
import { useCredentials } from "../providers/AuthenticationProvider";

export interface IDashboardNavProps {
  links: ILink[]
}

const useStyle = makeStyles((theme: Theme) => ({
  button: {
    background: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    display: "block",
    textAlign: "center",
    padding: theme.spacing(1,1),
    marginBottom: theme.spacing(1),
    transition: "box-shadow 0.15s, transform 0.15s, background-color 0.15s",
    "&:hover": {
      boxShadow: theme.shadows[3],
      transform: "scale(1.05,1.05)",
      backgroundColor: theme.palette.background.paper,
    }
  },
  selected: {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.background.paper,
  }
}))

export function VerticalNav(props: IDashboardNavProps){

  const router = useRouter()
  const classes = useStyle();
  const {isAuthenticated} = useCredentials();

  return (
    <Box>
      {props.links.filter(link => {
        if (link.needsAuth){
          return isAuthenticated();
        }
        else return !(link.needsAuth === false && isAuthenticated());
      }).map(link => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={classBag(classes.button, router.pathname === link.href?classes.selected:null)}>
            {link.name}
          </Link>
        )
      })}
    </Box>
  )
}
