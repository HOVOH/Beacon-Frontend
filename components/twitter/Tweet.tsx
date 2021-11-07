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
import { OutsideLink } from "../navigation/OutsideLink";
import { getProfileLink, getTweetLink } from "./twitterHelper";
import { If } from "../utils/If";

const useStyle = makeStyles((theme)=> ({
  card: {
    transition: `background-color ${theme.transitions.easing.easeOut} 0.1s`,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    }
  },
  cardLink: {
    display: "block"
  },
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

export interface ISimpleTweet {
  tweetId: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorName: string;
  createdAt: string;
  references: { type: "replied_to"|"retweeted"|"quoted", id: string}[];
}

export interface ITweetProps extends PropsWithClassName{
  tweet: ISimpleTweet;
}

export function Tweet(props: ITweetProps){

  const {tweet, style, className} = props;
  const classes = useStyle();

  return (
      <a className={classes.cardLink}
         href={getTweetLink(tweet.authorUsername, tweet.tweetId)}
         target={"_blank"}
         rel="nofollow noopener"
      >
        <Card className={classBag(classes.card, className)} style={style}>
          <Box className={classes.cardHeader}>
            <OutsideLink href={getProfileLink(tweet.authorUsername)} color={"light"}>
              <Typography variant={"h6"}>
                {tweet.authorName}
                <Muted className={classes.username}>@{tweet.authorUsername}</Muted>
              </Typography>
            </OutsideLink>
            <Typography color={"textSecondary"} variant={"subtitle1"}>{DateTime.fromISO(tweet.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}</Typography>
          </Box>
          <Box className={classes.cardContent}>
            <Typography component="p">{props.tweet.text}</Typography>
          </Box>
        </Card>
      </a>
  );
}
