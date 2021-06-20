import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { getFeed, IFeedItem } from "../../api/feed";
import { FeedItem } from "./FeedItem";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { IKeysetPageRequest } from "../../api/IKeysetPageRequest";
import { Skeleton } from "@material-ui/lab";

const useStyle = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  feed: {
    flex: "1 1 auto",
    overflowY: "hidden"
  }
}))

const PAGE_SIZE = 10;

export default function Feed(props: PropsWithClassName){

  const classes = useStyle();
  const [feedItems, setItems] = useState<IFeedItem<any>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const isItemLoaded = (index: number) => feedItems.length > index

  const loadNextPage = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const page: IKeysetPageRequest = {
      size: PAGE_SIZE,
    }
    if (feedItems.length > 0) {
      page.keyset = feedItems[feedItems.length-1].id
    }
    const response = await getFeed(page);
    setIsLoading(false);
    setItems([...feedItems, ...response.results]);
  }

  const Item = (props: {index: number, style: any}) => {
    const index = props.index;
    const style = {
      ...props.style,
      top: props.style.top+15,
      height: props.style.height - 15
    };
    if (!isItemLoaded(index)){
      return (<Skeleton width={600} variant={"rect"} style={style}/>);
    }
    return (<FeedItem event={feedItems[index]} style={style}/>);

  }

  return (
    <Box className={classBag(classes.root, props.className)}>
      <Box className={classes.feed}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={feedItems.length+1}
          loadMoreItems={loadNextPage}
        >
          {({ onItemsRendered, ref }) => (
            <AutoSizer>
              {(dimensions) => (
                <List
                  className="List"
                  height={dimensions.height}
                  itemCount={feedItems.length+1}
                  itemSize={() => 300}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={dimensions.width}
                >
                  {Item}
                </List>
              )}
            </AutoSizer>
            )}
        </InfiniteLoader>
      </Box>
    </Box>
  )
}

