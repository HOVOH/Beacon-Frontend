import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { TextField } from "../components/inputs/TextField";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";

export default function Login(){

  const {control} = useForm();
  const {active} = useWeb3React();

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Card>
        <CardContent>
          <Typography variant={"h3"} gutterBottom>Login</Typography>
        </CardContent>
        <CardActions>
          {active?<Button variant={"contained"} color={"primary"}>Login</Button>:<Button>Connect MM</Button>}

        </CardActions>
      </Card>
    </Box>
  )
}
