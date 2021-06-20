import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { TextField } from "../components/inputs/TextField";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { Title } from "../components/typography/Title";
import { useCredentials } from "../components/providers/AuthenticationProvider";
import { injected } from "../chain/connectors";

export default function Login(){

  const {control} = useForm();
  const {active, activate} = useWeb3React();
  const {web3Login, isAuthenticated} = useCredentials();

  if(isAuthenticated()){
    return ("Already connected");
  }

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Card>
        <CardContent>
          <Title>Login</Title>
        </CardContent>
        <CardActions>
          {active?(<Button
            variant={"contained"}
            color={"secondary"}
            onClick={web3Login}
          >
            Log in with MetaMask
          </Button>):(
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={()=>activate(injected)}>
              Connect MetaMask
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}
