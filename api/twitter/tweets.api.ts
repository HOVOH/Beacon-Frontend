import { client } from "../httpClient";
import { KeysetPage } from "../Pagination";

export interface ITweetsFilter {
  tags?: string[],
  size?: number,
  ids?: string[],
  noTopicsLabelled?: boolean,
  keyset?: string,
  order: "ASC"|"DES",
  orderBy: "createdAt"
}

export interface ITweet {
  tweetId: string,
  authorId: string,
  text: string,
  createdAt: string,
  conversationId: string,
  foundAt: string,
  updatedAt: string,
  meta: {
    lang: {
      reliable: boolean,
      textBytes: 273,
      languages: {
        name:string,
        code: string,
        percent: number
      }[]
    },
    tags: string[],
    topics: string[]
  }
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

}
