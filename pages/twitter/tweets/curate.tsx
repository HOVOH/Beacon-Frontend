import { Tweet } from "../../../components/twitter/Tweet";
import React, { useState } from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { useQuery, useQueryClient } from "react-query";
import { addTopics, getTweets } from "../../../api/twitter/tweets.api";
import { Checkbox } from "../../../components/inputs/Checkbox";
import { useForm } from "react-hook-form";
import { Skeleton } from "@material-ui/lab";
import { Title } from "../../../components/typography/Title";

const topics = [
  "crypto",
  "early stage",
  "presale",
  "lending",
  "dex",
  "NFT",
  "defi",
  "oracles",
  "yield",
] as const;
type Topics = typeof topics[number];

type TopicsForm = {
  [key in Topics]: boolean;
};

const useStyle = makeStyles(theme => ({
  wrapper:{
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[15],
  },
  buttons: {
    margin: theme.spacing(1),
  },
  tweets: {
    backgroundColor: theme.palette.background.default,
    maxWidth: "450px",
  }
}))

export default function CurateTweet(){

  const { handleSubmit, control, reset } = useForm({defaultValues:topics.reduce((obj, val)=>({...obj, [val]:false}), {})});
  const queryClient = useQueryClient()
  const classes = useStyle();
  const [keyset, setKeyset] = useState<string>("init")

  const { data, isFetching,  } = useQuery(
    ['tweet', keyset],
    () => getTweets({
      size: 1,
      order: "DES",
      orderBy: "createdAt",
      tags: ["imported"],
      noTopicsLabelled: true
}),
    { keepPreviousData: true, staleTime: 60000}
  )
  const tweet = data? data.results[0]: null;

  React.useEffect(() => {
    if (data) {
      queryClient.prefetchQuery(['tweet', data.page.lastToken], () =>
        getTweets({
          size: 1,
          tags: ["imported"],
          keyset: data.page.lastToken,
          order: "DES",
          orderBy: "createdAt",
          noTopicsLabelled: true
    })
      )
    }
  }, [keyset, data, queryClient])

  const submit = () => {
    submitTopics();
    nextTweet();
  }

  const nextTweet = () => {
    if (data){
      setKeyset(data.page.lastToken);
      reset(topics.reduce((obj, val)=>({...obj, [val]:false}), {}))
    }
  }

  const submitTopics = handleSubmit((data: TopicsForm)=> {
    if (tweet){
      addTopics(tweet.tweetId, topics.filter(topic=> data[topic]));
    }
  })

  return (
    <Box>
      <Box>
        <Title>Curate tweets</Title>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
        <Box className={classes.wrapper} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <Typography variant={"h4"}>The tweet</Typography>
            {tweet ?
              (<Tweet tweet={tweet} className={classes.tweets}/>)
                :
               isFetching ? (<Skeleton width={450} variant={"rect"} />) : ("No tweets to curate")
            }
          </Box>
          <Box p={2}>
            <Box>
              <Typography variant={"h4"}>Select topics</Typography>
              <Box display={"flex"} flexDirection={"column"}>
                {topics.map(topic => (
                  <Checkbox
                    key={topic}
                    control={control}
                    name={topic}
                    label={topic}
                  />
                ))}
              </Box>
              <Box display={"flex"}>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  onClick={submit}
                  disabled={isFetching}
                >Submit</Button>
                <Box ml={1}></Box>
                <Button variant={"outlined"} color={"primary"} onClick={nextTweet} disabled={isFetching}>Skip</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    );
}
