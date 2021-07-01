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
      }[],
    },
    topicsScore: {[s in string]: number},
    references: {id:string, type: "retweeted"|"quoted"|"replied_to"}[]
    tags: string[],
    topics: string[]
  }
}
