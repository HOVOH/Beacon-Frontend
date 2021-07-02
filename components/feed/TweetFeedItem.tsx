import React from "react";

import { classBag, PropsWithClassName } from "../../utils/classBag";
import { IFeedItem } from "../../api/feed";
import { ITweet } from "../../api/twitter/ITweet";
import { ITwitterUser } from "../../api/twitter/ITwitterUser";
import { Tweet } from "../twitter/Tweet";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { BeaconTheme } from "../../theme/common";

const useStyle = makeStyles((theme: BeaconTheme) => ({
  root: {
    background: theme.gradients.primary,
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  topic: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.info.main,
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(0.5),
  },
  topicKey: {
    marginRight: theme.spacing(0.5),
    textTransform: "capitalize",
  },
  topicScore: {

  }
}))

export interface ITweetFeedItemProps extends PropsWithClassName {
  event: IFeedItem<{ tweet: ITweet, author: ITwitterUser }>
}

export function TweetFeedItem(props: ITweetFeedItemProps){
  const {event} = props;
  const {tweet, author} = event.data;
  const classes = useStyle();

  return (
    <Box className={classBag(classes.root, props.className)} style={props.style}>
      <Box mx={2} my={1}>
        <Typography variant={"h5"}>Twitter - {mapReferences(tweet)}</Typography>
      </Box>
      <Tweet tweet={tweet} author={author}/>
      <Box mx={1} my={1} display={"flex"}>
          {Object.keys(tweet.meta.topicsScore).map(key => (
            <Box className={classes.topic}>
              <Typography variant={"body2"} display={"inline"}
                          className={classes.topicKey}>
                {key}
              </Typography>
              <Typography variant={"body2"} display={"inline"}
                          className={classes.topicScore}>
                {Math.round(tweet.meta.topicsScore[key]*100)}%
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

const mapReferences = (tweet: ITweet): string => {
  const map = {
    replied_to: "Reply",
    retweeted: "Retweet",
    quoted: "Quote"
  }
  if (tweet?.meta?.references?.length > 0){
    // @ts-ignore
    return map[tweet.meta.references[0].type];
  }
  return "Tweet"
}
