import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BEACON_API_URL,
  withCredentials: true,
})
