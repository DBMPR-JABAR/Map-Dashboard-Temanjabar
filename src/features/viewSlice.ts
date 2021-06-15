import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { mapOptions, mapViewOptions } from '../utils/map'


export interface ViewState {
    type: "2d" | "3d",
    view: __esri.View | null
}
  
const initialState: ViewState = {
    type: "2d",
    view: null
};

export const viewSlice = createSlice({
    name: 'esri',
    initialState,
    reducers: {
        toggle3D: (state) => {
            state.type = (state.type === "2d") ? "3d" : "2d"
        }
    }
})

export const { toggle3D } = viewSlice.actions


export const selectMapType = (state: RootState) => state.view.type

export default viewSlice.reducer;
