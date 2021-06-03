import { client } from "../httpClient";

export const logout = async () => {
  await client.post("v1/authentication/logout")
}
