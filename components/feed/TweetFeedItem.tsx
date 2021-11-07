import React, { useState } from "react";

import { classBag, PropsWithClassName } from "../../utils/classBag";
import { IFeedItem } from "../../api/feed";
import { ITweet } from "../../api/twitter/ITweet";
import { ITwitterUser } from "../../api/twitter/ITwitterUser";
import { ISimpleTweet, Tweet } from "../twitter/Tweet";
import { Box, Button, Dialog, makeStyles, Typography } from "@material-ui/core";
import { BeaconTheme } from "../../theme/common";
import { Hint } from "../typography/Hint";
import { addTopics } from "../../api/twitter/tweets.api";
import { popup } from "../hooks/popup";
import TweetLabeling, { topics } from "../twitter/TweetLabeling";
import { Title } from "../typography/Title";

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
  activeTopic: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.info.main,
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(0.5),
  },
  topic: {
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.primary.contrastText,
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(0.5),
  },
  topicKey: {
    marginRight: theme.spacing(0.5),
    textTransform: "capitalize",
  },
  topicScore: {

  },
  smallMargin: {
    marginRight: theme.spacing(1)
  }
}))

export interface ITweetFeedItemProps extends PropsWithClassName {
  event: IFeedItem<ISimpleTweet>,
  ref?: any,
}

export function TweetFeedItem(props: ITweetFeedItemProps){
  const {event} = props;
  const tweet = event.data;
  const classes = useStyle();

  return (
    <Box className={classBag(classes.root, props.className)} style={props.style}>
      <Box className={classes.wrapper}>
        <Box mx={2} my={1}>
          <Typography variant={"h5"}>Twitter - {mapReferences(tweet)}</Typography>
        </Box>
        <Tweet tweet={tweet}/>
      </Box>
    </Box>
  )
}

const mapReferences = (tweet: ISimpleTweet): string => {
  const map = {
    replied_to: "Reply",
    retweeted: "Retweet",
    quoted: "Quote"
  }
  if (tweet.references?.length > 0){
    return map[tweet.references[0].type];
  }
  return "Tweet"
}
