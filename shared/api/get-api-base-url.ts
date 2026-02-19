export const getApiBaseUrl = (): string => {
  const apiRoute =
    process.env.NODE_ENV === "development"
      ? process.env.BFF_PATH
      : process.env.API_ROUTE

  return `${apiRoute}`
}
