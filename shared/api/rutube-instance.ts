import axios from "axios"

export const rutubeInstance = axios.create({
  baseURL: process.env.RUTUBE_BFF_PATH,
  timeout: 1000
})
