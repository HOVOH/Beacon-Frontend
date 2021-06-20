import { IFeedItem } from "../../api/feed";
import { Tweet } from "../twitter/Tweet";
import React from "react";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import { makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { TweetFeedItem } from "./TweetFeedItem";

const useStyle = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
  }
}))

export interface IFeedItemProps extends PropsWithClassName{
  event: IFeedItem<any>
}

export function FeedItem(props:IFeedItemProps) {
  const {event, style} = props;
  const classes = useStyle();

  if (event.type === "TWEET_FEED_EVENT"){
    return (
      <TweetFeedItem event={event} className={classBag(classes.root, props.className)} style={style}/>
      )
  }
  return <Typography style={style}>Unsupported</Typography>;
}
