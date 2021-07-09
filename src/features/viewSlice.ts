import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Coordinate } from '../utils/constants'
import { mapOptions, mapViewOptions } from '../utils/map'


export interface ViewState {
    type: "2d" | "3d",
    coordinate: Coordinate
}
  
const initialState: ViewState = {
    type: "2d",
    coordinate: {
        latitude: 0,
        longitude: 0
    }
}

export const viewSlice = createSlice({
    name: 'esri',
    initialState,
    reducers: {
        toggle3D: (state) => {
            state.type = (state.type === "2d") ? "3d" : "2d"
        },
        setCoordinate: (state, action: PayloadAction<{lat: number, long: number}>) => {
            state.coordinate = {latitude: action.payload.lat, longitude: action.payload.long}
        }
    }
})

export const { toggle3D, setCoordinate } = viewSlice.actions


export const selectView = (state: RootState) => state.view

export default viewSlice.reducer
