export interface KeysetPage<T> {
  page: {
    lastToken: string,
    firstToken: string,
    size: number,
  }
  results: T
}
