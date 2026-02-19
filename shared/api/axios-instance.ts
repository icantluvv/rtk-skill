import axios from "axios"
import { getApiBaseUrl } from "./get-api-base-url"

export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  timeout: 1000
})
