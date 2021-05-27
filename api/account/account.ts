import { client } from "../httpClient";

export const whoami = async () => {
  const response = await client.get("v1/account");
  return response.data;
}

export const updateAccount = async (update: any) => {
  const response = await client.post("v1/account", update);
  return response.data;
}
