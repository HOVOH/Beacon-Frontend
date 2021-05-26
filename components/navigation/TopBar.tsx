
import { Box, Theme, Toolbar} from "@material-ui/core";
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { AccountStatus } from "../account/AccountStatus";

const useStyle = makeStyles((theme: Theme) => ({

}))

export function TopBar(props: any){
  const classes = useStyle();
  return (
      <Toolbar>
        <Box display={"flex"} justifyContent={"right"} alignItems={"center"} width={"100%"}>
          <AccountStatus/>
        </Box>
      </Toolbar>
  );
}
