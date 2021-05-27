import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTwitterUsers, importTwitterUsers } from "../../../api/twitter/twitter-user.api";
import { Box, Button, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Title } from "../../../components/Title";
import { Subtitle } from "../../../components/Subtitle";
import { BeaconTheme } from "../../../theme/common";
import { NotFound } from "../../../components/navigation/NotFound";
import { getTweets } from "../../../api/twitter/tweets.api";

const useStyle = makeStyles((theme: BeaconTheme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[15],
  },
  header: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  metrics: {
    padding: theme.spacing(2),
    background: theme.gradients.primary,
    borderRadius: theme.shape.borderRadius,
  }
}))

export default function UserPage(props: any){
  const classes = useStyle();

  const queryClient = useQueryClient()
  const router= useRouter();
  const username = router.query.username as string;

  const { data: users, isError, error, isLoading } = useQuery(
    ['twitter-user', username],
    () => getTwitterUsers([username]),
    { retry: false, staleTime: 60000 }
  )

  const importUser = useMutation(() => importTwitterUsers([username]),{
    onSuccess: data => {
      queryClient.setQueryData(["twitter-user", username], data);
    },
  })

  const user = users && users.length > 0 ? users[0]: null;

  if(isLoading){
    return ("loading...");
  }

  const isImported = () => {
    return user? user.tags.includes("imported"): false;
  }

  if (isError){
    console.log(error);
    return (<NotFound title={"User not found"}/>)
  }

  return (
    <Box>
      <Box>
        <Box className={classes.header}>
          <Box>
            <Title>{user?.name}</Title>
            <Subtitle>@{user?.username}</Subtitle>
          </Box>
          <Box>
            {isImported()?(
              <Button disabled={true}>Imported</Button>
            ):(
              <Button
                variant={"outlined"}
                color={"secondary"}
                onClick={() => importUser.mutate()}
                disabled={importUser.isLoading}
              >
                {importUser.isLoading?(<CircularProgress color="secondary" />):"Import"}
              </Button>
            )}
          </Box>
        </Box>
        <Box display={"flex"} mt={2}>
          {user?.description && (
            <Box flex={"1 1 auto"}>
              {user.description}
            </Box>
          )}
          <Box className={classes.metrics} flex={"0 0 auto"}>
            <Typography>Followers: {user?.publicMetrics.followerCount}</Typography>
            <Typography>Following: {user?.publicMetrics.followingCount}</Typography>
            <Typography>Tweet count: {user?.publicMetrics.tweetCount}</Typography>
            <Typography>Listed count: {user?.publicMetrics.listedCount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )

}
