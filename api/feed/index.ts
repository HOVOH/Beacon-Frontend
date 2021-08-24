import { IKeysetPageRequest } from "../IKeysetPageRequest";
import { client } from "../httpClient";
import { IKeysetPageResponse } from "../IKeysetPageResponse";

export interface IFeedItem<T>{
  id: string,
  type: "TWEET_FEED_EVENT" | "TWITTER_FOLLOWING_EVENT",
  data: T
}

export const getFeed = async ({ types }: {types?: string[]}, page?: IKeysetPageRequest): Promise<IKeysetPageResponse<IFeedItem<any>>> => {
  const response = await client.get("v1/feed", {params: {
      types: types?.join(","),
      ...page
    }});
  return response.data;
}
