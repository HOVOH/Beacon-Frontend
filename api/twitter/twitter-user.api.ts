import { client } from "../httpClient";
import { ITwitterUser } from "./ITwitterUser";

export const getTwitterUsers = async (usernames: string[]): Promise<ITwitterUser[]> => {
  const response = await client.get(`v1/twitter/users`, {params: { usernames: usernames.join(",")}});
  return response.data;
}

export const getTwitterUser = async (id: string): Promise<ITwitterUser> => {
  const response = await client.get(`v1/twitter/users/${id}`);
  return response.data;
}

export const importTwitterUsers = async (usernames: string[]): Promise<ITwitterUser[]> => {
  const response = await client.get(`v1/twitter/users`, {params: { usernames: usernames.join(","), import: true}});
  return response.data;
}
