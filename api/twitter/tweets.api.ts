import { client } from "../httpClient";
import { KeysetPage } from "../Pagination";
import { ITweet } from "./ITweet";
import { AxiosResponse } from "axios";

export interface ITweetsFilter {
  tags?: string[],
  size?: number,
  ids?: string[],
  noTopicsLabelled?: boolean,
  keyset?: string,
  order: "ASC"|"DES",
  orderBy: "createdAt"
}

export async function getTweets({ tags, ...filter }: ITweetsFilter): Promise<KeysetPage<ITweet[]>>{
  const params = {
    ...filter,
    tags: tags?.join(",")
  }
  const response = await client.get("v1/twitter/tweets",{params});
  return response.data
}

export async function addTopics(tweetId: string, topics: string[]){
  const response = await client.put(`v1/twitter/tweets/${tweetId}/meta/topics`,{topics});
  return response as AxiosResponse<ITweet>;
}

export interface IDeleteTweetsFilter {
  authorTids?: string[],
  includeTagged?: boolean,
}

export async function deleteTweets({authorTids, ...filter}: IDeleteTweetsFilter){
  const params = {
    authorTids: authorTids?.join(","),
    ...filter
  }
  const response = await client.delete("v1/twitter/tweets", {params});
  console.log(response);
}
