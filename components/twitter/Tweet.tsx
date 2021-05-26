import {Card} from '../Card';
import { Box, CardContent, CardHeader, Typography } from "@material-ui/core";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import { ITweet } from "../../api/twitter/tweets.api";
import React from "react";
import {DateTime} from 'luxon';
import { useQuery } from "react-query";
import { getTwitterUser } from "../../api/twitter/twitter-user.api";

export interface ITweetProps extends PropsWithClassName{
  tweet: ITweet
}

export function Tweet(props: ITweetProps){

  const {tweet} = props;

  const {data} = useQuery(['twitter-users', tweet.authorId]
    , () => getTwitterUser(tweet.authorId),
    { retry: false, staleTime: 60000});

  return (
    <Card className={classBag(props.className)}>
      <CardHeader
        title={(data?.name) ?? tweet.authorId ?? "Author unknown"}
        subheader={DateTime.fromISO(tweet.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}
      />
      <CardContent>
        <Typography component="p">{props.tweet.text}</Typography>
      </CardContent>
    </Card>
  );
}
