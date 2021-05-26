import { useCredentials } from "../components/providers/AuthenticationProvider";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { TextField } from "../components/inputs/TextField";
import { useForm } from "react-hook-form";
import { updateAccount } from "../api/account/account";
import { useState } from "react";

const useStyle = makeStyles((theme) => ({
  wrapper: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[15],
  },
  header: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2)
  },
  form: {
    borderRadiusBottom: theme.shape.borderRadius,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  actions: {
    marginTop: theme.spacing(1)
  }
}))

export default function Account(props: any){

  const classes = useStyle();
  const {user, updateUser} = useCredentials();
  const {control, handleSubmit} = useForm();
  const [updating, setUpdating] = useState(false);

  const submit = handleSubmit((data)=>{
    setUpdating(true);
    updateAccount(data)
      .then(()=> updateUser(data))
      .then(() => setUpdating(false))
      .catch(() => setUpdating(false));
  })

  if(!user){
    return (<span>Not connected</span>)
  }

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box className={classes.wrapper}>
        <Box className={classes.header}>
          <Typography variant={"button"}>Account</Typography>
          <Typography variant={"h4"}>{user.ethereumAddress}</Typography>
        </Box>
        <Box className={classes.form}>
          <TextField name={"username"} control={control} label={"Username"} defaultValue={user.username}/>
        </Box>
        <Box className={classes.actions}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={() => submit()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  )

}
