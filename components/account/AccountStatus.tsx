import React from 'react';
import { useWeb3React } from "@web3-react/core";
import { useCredentials } from "../providers/AuthenticationProvider";
import { Box, Button, makeStyles } from "@material-ui/core";
import { injected } from "../../chain/connectors";

const useStyle = makeStyles((theme) => ({
  partiallyConnected: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  fullyConnected: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    }
  }
}))

export function AccountStatus(props: any) {

  const classes = useStyle();
  const {active, account, activate, library} = useWeb3React();
  const {isAuthenticated, user, web3Login} = useCredentials();

  if (isAuthenticated()){
    return (
      <Button variant={"contained"} className={classes.fullyConnected}>{user?.username??user?.ethereumAddress}</Button>
    )
  } else if (active){
    return <Button
      variant={"contained"}
      className={classes.partiallyConnected}
      onClick={web3Login}
    >
      {account}
    </Button>
  } else {
    return (<Button
      variant={"contained"}
      color={"primary"}
      onClick={()=>activate(injected)}>
      Connect
    </Button>
    )
  }

}
