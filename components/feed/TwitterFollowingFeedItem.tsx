import { ITwitterUser } from "../../api/twitter/ITwitterUser";
import { IFeedItem } from "../../api/feed";
import { Box, List, ListItem, makeStyles, Typography } from "@material-ui/core";
import { BeaconTheme } from "../../theme/common";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import React from "react";
import { Muted } from "../typography/Muted";
import { Subtitle } from "../typography/Subtitle";
import { OutsideLink } from "../navigation/OutsideLink";

const useStyle = makeStyles((theme: BeaconTheme) => ({
  root: {
    background: theme.gradients.primary,
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  wrapper: {
    background: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  },
  username: {
    marginLeft: theme.spacing(1),
  },
  userLink: {
    color: theme.palette.text.primary
  }
}))

export interface ITwitterFollowingFeedItemProps extends PropsWithClassName{
  event: IFeedItem<{
    twitterUser: ITwitterUser,
    started: ITwitterUser[],
    stopped: ITwitterUser[]
  }>
}

export function TwitterFollowingFeedItem(props: ITwitterFollowingFeedItemProps){
  const classes = useStyle();
  const data = props.event.data
  const {twitterUser: user, started, stopped } = data;


  return (
    <Box className={classBag(classes.root, props.className)} style={props.style}>
      <Box className={classes.wrapper}>
        <Box mx={2} my={1}>
          <Typography variant={"h5"}>Twitter - Follow</Typography>
          <Box>
            <Typography variant={"h6"}>{user.name}
              <Muted className={classes.username}>@{user.username}</Muted>
            </Typography>
            <Box display={"flex"} m={1} p={1}>
              {
                started.length > 0 && (
                  <Box p={1}>
                    <Typography align={"center"} color={"textSecondary"} variant={"h6"}>
                      Started following
                    </Typography>
                    <List>
                      {started.map(user => (
                        <ListItem key={user.username}>
                          <OutsideLink href={"https://twitter.com/"+user.username} className={classes.userLink}>{user.name}<Muted className={classes.username}>@{user.username}</Muted></OutsideLink>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )
              }{ stopped.length > 0 && (
                <Box p={1}>
                  <Typography align={"center"} color={"textSecondary"} variant={"h6"}>
                    Stopped following
                  </Typography>
                  <List>
                    {stopped.map((user, i) => {
                      if (user) {
                        return (
                          <ListItem key={user.username}>
                            <OutsideLink href={"https://twitter.com/" + user.username}
                                         className={classes.userLink}>{user.name}<Muted
                              className={classes.username}>@{user.username}</Muted></OutsideLink>
                          </ListItem>
                        );
                      }
                      return (
                        <ListItem key={i}>
                          Unknown
                        </ListItem>
                      )
                    })}
                  </List>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
