import React, { useState } from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { Title } from "../components/typography/Title";
import Feed, { FeedSettings } from "../components/feed/Feed";
import FilterListIcon from '@material-ui/icons/FilterList';
import { useForm } from "react-hook-form";
import { Subtitle } from "../components/typography/Subtitle";
import { Checkbox } from "../components/inputs/Checkbox";

const useStyle = makeStyles(theme => ({
  root: {
    height: "100%"
  }
}))


const defaultFilter = {
  tweets: true,
  twitterFollow: true,
};

const checkboxToSettings = (data: typeof defaultFilter): FeedSettings => {
  const types = [];
  if (data.tweets){
    types.push("TWEET_FEED_EVENT")
  }
  if(data.twitterFollow){
    types.push("TWITTER_FOLLOWING_EVENT")
  }
  return {types};
}

export default function FeedPage(props:any) {
  const classes = useStyle();
  const [settings, setSettings] = useState<FeedSettings>(checkboxToSettings(defaultFilter));
  const {handleSubmit, control} = useForm({
    defaultValues: defaultFilter
  })
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterUpdate = handleSubmit(async (data) => {
    console.log(data)
    setSettings(checkboxToSettings(data));
  });

  const toggleFilter = () => {setFilterOpen(!filterOpen)}

  return (
    <Box className={classes.root}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Title>Feed</Title>
        <Box>
          <Button endIcon={<FilterListIcon/>} onClick={toggleFilter}>filter</Button>
        </Box>
      </Box>
      {filterOpen && (
        <Box>
          <Subtitle>Filter</Subtitle>
          <Checkbox name={"tweets"} control={control} label={"Tweets"}/>
          <Checkbox name={"twitterFollow"} control={control} label={"Follows"}/>
          <Button onClick={handleFilterUpdate}>Apply</Button>
        </Box>
      )}
      <Feed settings={settings}/>
    </Box>
  )
}
