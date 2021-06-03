import React from "react";
import { Box, Typography } from "@material-ui/core";
import { VerticalNav } from "./VerticalNav";

export interface IDashboardNavProps {
}

export function DashboardNav(props: IDashboardNavProps){
  return (
    <Box>
      <VerticalNav links={[
          {
            href: "/",
            name: "Home"
          },
          {
            href: "/twitter/tweets/curate",
            name: "Tweet curation",
            needsAuth: true
          },
          {
            href: "/twitter/users",
            name: "Twitter user",
            needsAuth: true
          },
          {
            href: "/account",
            name: "Account",
            needsAuth: true,
          },
          {
            href: "/login",
            name: "Login",
            needsAuth: false
          }
        ]
      }/>
    </Box>
  )
}
