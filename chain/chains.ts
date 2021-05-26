export interface Chain {
  id: number,
  name: string,
  ticker: string
}

export const chains = [
  {
    id: 1,
    name: "Ethereum",
    ticker: "ETH"
  },
  {
    id: 3,
    name: "Ropstein",
    ticker: "ETH"
  },
  {
    id: 56,
    name: "Binance Smart Chain",
    ticker: "BNB"
  },
  {
    id: 250,
    name: "Fantom",
    ticker: "FTM"
  }
]

export function getChain(id: number): Chain{
  return chains.find(chain => chain.id === id);
}
