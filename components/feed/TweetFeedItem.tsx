import React, { useState } from "react";

import { classBag, PropsWithClassName } from "../../utils/classBag";
import { IFeedItem } from "../../api/feed";
import { ITweet } from "../../api/twitter/ITweet";
import { ITwitterUser } from "../../api/twitter/ITwitterUser";
import { Tweet } from "../twitter/Tweet";
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
  event: IFeedItem<{ tweet: ITweet, author: ITwitterUser }>,
  ref?: any,
}

export function TweetFeedItem(props: ITweetFeedItemProps){
  const {event, ref} = props;
  const {tweet, author} = event.data;
  const classes = useStyle();
  const [labelingIsConfirmed, setConfirmed] = useState(false)
  const [labelPopupOpen, openPopup, closePopup] = popup(false);

  const confirmLabelsAreOk =  (tweet: ITweet) => addTopics(tweet.tweetId, tweet.meta.labels)

  const submitLabels = async (tweet: ITweet, topics: string[]) => {
    const response = await addTopics(tweet.tweetId, topics);
    const success = response.status === 200;
    if (success){
      setConfirmed(true);
    }
    closePopup()
    return success;
  }

  return (
    <Box className={classBag(classes.root, props.className)} style={props.style}>
      <Box className={classes.wrapper}>
        <Box mx={2} my={1}>
          <Typography variant={"h5"}>Twitter - {mapReferences(tweet)}</Typography>
        </Box>
        <Tweet tweet={tweet} author={author}/>
        <Box mx={1} my={1} display={"flex"} alignItems={"center"}>
          <Typography color={"textSecondary"} className={classes.smallMargin}>Labels </Typography>
          {topics.map(topic => (
            <Box className={tweet.meta.labels.includes(topic)?classes.activeTopic: classes.topic} key={topic}>
              <Typography variant={"body2"} display={"inline"}
                          className={classes.topicKey}>
                {topic}
              </Typography>
            </Box>
          ))}
        </Box>
        {!labelingIsConfirmed && (
          <Box mx={1} mb={1} display={"flex"} alignItems={"center"}>
            <Typography className={classes.smallMargin}>Is this labeling correct?</Typography>
            <Button size={"small"} variant={"outlined"} className={classes.smallMargin}
              onClick={() => confirmLabelsAreOk(tweet)}
            >Yes</Button>
            <Button size={"small"} variant={"contained"}
                    onClick={() => openPopup()}>No</Button>
          </Box>
        )}
      </Box>
      <Dialog open={labelPopupOpen} onClose={closePopup}>
        <Box display={"flex"} m={2} alignItems={"center"}>
          <Box>
            <Typography variant={"h4"}>Correct topics for the following tweet</Typography>
            <Tweet tweet={tweet} author={author}/>
          </Box>
          <TweetLabeling onSubmit={(topics) => submitLabels(tweet, topics)} checkedTopics={tweet.meta.labels}/>
        </Box>
      </Dialog>
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
