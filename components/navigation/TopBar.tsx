
import { Box, IconButton, Theme, Toolbar } from "@material-ui/core";
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { AccountStatus } from "../account/AccountStatus";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useCredentials } from "../providers/AuthenticationProvider";

const useStyle = makeStyles((theme: Theme) => ({

}))

export function TopBar(props: any){

  const {logout, isAuthenticated} = useCredentials();
  const classes = useStyle();
  return (
      <Toolbar>
        <Box display={"flex"} justifyContent={"right"} alignItems={"center"} width={"100%"}>
          <AccountStatus/>
          {isAuthenticated() && (<IconButton color={"primary"} onClick={logout}><ExitToAppIcon/></IconButton>)}
        </Box>
      </Toolbar>
  );
}
