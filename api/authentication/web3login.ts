import { client } from "../httpClient";

export const getLoginVerificationCode = async (address: string) => {
  const response = await client.get("v1/authentication/web3-login-code", {params: {
      ethereumAddress: address
  }})
  return response.data.code;
}

export const loginWithSignature = async (address: string, signature:string) => {
  const response = await client.post("v1/authentication/web3-login",{
    ethereumAddress: address,
    signature: signature
  })
  return response.data;
}
