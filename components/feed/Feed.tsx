import React, { useEffect, useRef, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { getFeed, IFeedItem } from "../../api/feed";
import { FeedItem } from "./FeedItem";
import { classBag, PropsWithClassName } from "../../utils/classBag";
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { IKeysetPageRequest } from "../../api/IKeysetPageRequest";
import { Skeleton } from "@material-ui/lab";
import { ErrorBox } from "../errors/ErrorBox";

const useStyle = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  feed: {
    flex: "1 1 auto",
    overflowY: "hidden"
  },
  feedItem: {
    paddingTop: theme.spacing(1)
  }
}))

const PAGE_SIZE = 10;

export interface FeedSettings {
  types: string[]
}

export interface IFeedProps extends PropsWithClassName{
  settings?: FeedSettings
}

export default function Feed(props: IFeedProps){
  const classes = useStyle();
  const [feedItems, setItems] = useState<IFeedItem<any>[]>([]);
  const itemsHeights = useRef<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<any>(null);
  const listRef = useRef<any>(null);
  let loaderRef = useRef<any>(null);

  const isItemLoaded = (index: number) => feedItems.length > index;

  useEffect(() => {
    setItems([]);
    itemsHeights.current = [];
  }, [props.settings])

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
    try{
      const response = await getFeed(props.settings??{}, page);
      setIsLoading(false);
      setItems([...feedItems, ...response.results]);
    } catch (error) {
      setError(error)
    }
  }

  const Item = (props: {index: number, style: any}) => {
    const index = props.index;
    const style = {
      ...props.style,
      top: props.style.top,
      height: props.style.height
    };
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref.current) {
        listRef.current.resetAfterIndex && listRef.current.resetAfterIndex(index);
        itemsHeights.current[index] = ref.current.clientHeight;
      }
    }, [ref]);

    useEffect(() => {
      loaderRef.current.current = listRef.current;
    }, [listRef])

    if (!isItemLoaded(index)){
      return (
        <div style={style}>
            <Skeleton width={600} variant={"rect"}/>
        </div>
      );
    }
    return (
      <div style={style}>
        <div ref={ref} className={classes.feedItem}>
          <FeedItem event={feedItems[index]}/>
        </div>
      </div>
    );

  }

  if (error){
    return (<ErrorBox error={error} resource={"feed"}/>)
  }

  return (
    <Box className={classBag(classes.root, props.className)}>
      <Box className={classes.feed}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={feedItems.length+1}
          loadMoreItems={loadNextPage}
        >
          {({ onItemsRendered, ref }) => {
            loaderRef.current = ref;
            return (
              <AutoSizer>
                {(dimensions) => (
                  <List
                    height={dimensions.height}
                    itemCount={feedItems.length + 1}
                    itemSize={(index) => itemsHeights.current[index] || 300}
                    onItemsRendered={onItemsRendered}
                    ref={listRef}
                    width={dimensions.width}
                  >
                    {Item}
                  </List>
                )}
              </AutoSizer>
            );
          }}
        </InfiniteLoader>
      </Box>
    </Box>
  )
}

