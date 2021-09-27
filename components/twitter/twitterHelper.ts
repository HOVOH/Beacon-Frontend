export const TWITTER_URL = "https://twitter.com/"

export const getProfileLink = (username: string) => TWITTER_URL+username;

export const getTweetLink = (username: string, tid: string) => getProfileLink(username)+"/status/"+tid
