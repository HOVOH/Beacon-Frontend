import {Card} from '../Card';
import { Box, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import { ITweet } from "../../api/twitter/ITweet";
import React from "react";
import {DateTime} from 'luxon';
import { useQuery } from "react-query";
import { getTwitterUser } from "../../api/twitter/twitter-user.api";
import { ITwitterUser } from "../../api/twitter/ITwitterUser";
import { Muted } from "../typography/Muted";
import { Hint } from "../typography/Hint";

const useStyle = makeStyles((theme)=> ({
  cardHeader:{
    padding: theme.spacing(2)
  },
  username: {
    marginLeft: theme.spacing(1),
  },
  cardContent: {
    padding: theme.spacing(2),
    paddingTop: 0,
  }
}))

export interface ITweetProps extends PropsWithClassName{
  tweet: ITweet,
  author?: ITwitterUser
}

export function Tweet(props: ITweetProps){

  const {tweet, style, className} = props;
  const classes = useStyle();

  const {data: author} = useQuery(['twitter-users', tweet.authorId]
    , () => props.author?Promise.resolve(props.author):getTwitterUser(tweet.authorId),
    { retry: false, staleTime: 60000});

  return (
    <Card className={classBag(className)} style={style}>
      <Box className={classes.cardHeader}>
        <Typography variant={"h6"}>
          {(author?.name) ?? tweet.authorId ?? "Author unknown"}
          <Muted className={classes.username}>@{author?.username}</Muted>
        </Typography>
        <Typography color={"textSecondary"} variant={"subtitle1"}>{DateTime.fromISO(tweet.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}</Typography>
      </Box>
      <Box className={classes.cardContent}>
        <Typography component="p">{props.tweet.text}</Typography>
      </Box>
      <Box mx={1}>
        <Hint>Debug info: tid: {author?.userId}, tweetId: {tweet?.tweetId}</Hint>
      </Box>
    </Card>
  );
}
