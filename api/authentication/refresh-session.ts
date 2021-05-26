import { client } from "../httpClient";

export const refreshSession = async () =>{
  const response = await client.post("v1/authentication/refresh-token");
  return response.data;
}
