export interface ITwitterUser {
  userId: number,
  verified: boolean,
  protected: boolean,
  username: string,
  foundAt: Date,
  updatedAt: Date,
  tags: string[],
  name: string,
  description: string,
  pinnedTweet: {tweetId: string},
  publicMetrics: {
    followerCount: number,
    followingCount: number,
    tweetCount: number,
    listedCount: number,
  }
}
