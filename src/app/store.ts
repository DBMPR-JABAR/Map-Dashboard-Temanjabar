import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import viewReducer from "../features/viewSlice" 
import featureReducer from "../features/featureSlice"

export const store = configureStore({
    reducer: {
        view: viewReducer,
        features: featureReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;