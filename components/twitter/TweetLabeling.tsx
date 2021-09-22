import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Checkbox } from "../inputs/Checkbox";
import React from "react";
import { PropsWithClassName } from "../../utils/classBag";
import { useForm } from "react-hook-form";
import { Hint } from "../typography/Hint";

export const topics = [
  "crypto",
  "early stage",
  "presale",
  "lending",
  "dex",
  "NFT",
  "defi",
  "oracles",
  "yield",
  "giveaway"
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

export interface ITweetLabelingProps extends PropsWithClassName {
  isLoading?: boolean,
  onSubmit: (topics: string[]) => Promise<boolean>,
  checkedTopics?: string[]
}

export default function TweetLabeling(props: ITweetLabelingProps){
  const classes = useStyle();
  const {isLoading, onSubmit, checkedTopics} = props;
  const { handleSubmit, control, reset } = useForm({defaultValues:topics.reduce((obj, val)=>({...obj, [val]:!!checkedTopics?.includes(val)}), {})});

  const handleClick = handleSubmit(async (data: TopicsForm)=> {
    await submit(topics.filter(topic=> data[topic]));
  })

  const submit = async (topicsSelected: string[]) => {
    const success = await onSubmit(topicsSelected);
    if (success) {
      reset(topics.reduce((obj, val)=>({...obj, [val]:false}), {}))
    }
  }

  return (
    <Box className={classes.wrapper} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box p={2}>
        <Box>
          <Typography>Select topics</Typography>
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
          <Box>
            <Box display={"flex"} alignItems={"center"}>
              <Button
                variant={"contained"}
                color={"secondary"}
                onClick={handleClick}
                disabled={isLoading}
              >Submit</Button>
              <Box ml={1}></Box>
              <Button
                variant={"outlined"}
                color={"primary"}
                onClick={() => submit([])}
                disabled={isLoading}
              >No topics</Button>
            </Box>
            </Box>
        </Box>
      </Box>
    </Box>
  )
}

