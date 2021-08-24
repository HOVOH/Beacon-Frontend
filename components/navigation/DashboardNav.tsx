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
            href: "/feed",
            name: "Feed",
            needsAuth: true
          },
          {
            href: "/twitter/tweets/labelling",
            name: "Tweet Labelling",
            needsAuth: true
          },
          {
            href: "/twitter/users",
            name: "Twitter User",
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
