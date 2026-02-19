import axios from "axios"
import { getApiBaseUrl } from "./get-api-base-url"

export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  auth: {
    username: process.env.HTTP_AUTH_LOGIN || "",
    password: process.env.HTTP_AUTH_PASS || ""
  },
  timeout: 1000
})
