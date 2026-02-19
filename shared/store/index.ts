import { videoSearchReducer } from "@/features/video-search"
import { configureStore } from "@reduxjs/toolkit"

export const makeStore = () => {
  return configureStore({
    reducer: {
      videoSearch: videoSearchReducer
    },
    devTools: process.env.NODE_ENV !== "production"
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
