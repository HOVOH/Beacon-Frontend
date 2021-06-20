export interface IKeysetPageResponse<T> {
  page: {
    lastToken: string,
    firstToken: string,
    size: number,
  },
  results: T[]
}
