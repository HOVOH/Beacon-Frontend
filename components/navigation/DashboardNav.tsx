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
          },
          {
            href: "/twitter/users",
            name: "Twitter user"
          },
          {
            href: "/account",
            name: "Account",
          },
        ]
      }/>
    </Box>
  )
}
