import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { Title } from "../../../components/Title";
import { useForm } from "react-hook-form";
import { TextField } from "../../../components/inputs/TextField";
import { useRouter } from "next/router";

const useStyle = makeStyles(theme => ({
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  searchBox: {
    marginRight: theme.spacing(1),
  }
}))

export default function UsersIndex(props: any) {

  const classes = useStyle();
  const {control, handleSubmit} = useForm();
  const router = useRouter();

  const handleSearch = handleSubmit((data) => {
    router.push(`/twitter/users/${data.username}`);
  })

  return(
    <Box>
      <Box className={classes.title}>
        <Box>
          <Title>Users</Title>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <TextField
            name={"username"}
            control={control}
            label={"Username"}
            className={classes.searchBox}
          />
          <Button variant={"contained"} color={"primary"} onClick={handleSearch}>Search</Button>
        </Box>
      </Box>
    </Box>
  )
}
