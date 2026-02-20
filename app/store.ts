import { videoSearchApi } from "@/features/video-search"
import { configureStore } from "@reduxjs/toolkit"

export const makeStore = () =>
  configureStore({
    reducer: {
      [videoSearchApi.reducerPath]: videoSearchApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(videoSearchApi.middleware),
    devTools: process.env.NODE_ENV !== "production"
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
