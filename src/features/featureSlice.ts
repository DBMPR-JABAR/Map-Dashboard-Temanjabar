import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { mapOptions, mapViewOptions } from '../utils/map'
import { jalanProvinsiConfig } from '../utils/map_config/jalan_provinsi'

export interface FeatureState {
    featureLayerProps: __esri.FeatureLayerProperties[]
}
  
const initialState: FeatureState = {
    featureLayerProps : [
        // {url: "https://tj.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/4/"}
    ]
}

export const featureSlice = createSlice({
    name: 'esri',
    initialState,
    reducers: {
        addFeatureLayer: (state, action: PayloadAction<__esri.FeatureLayerProperties>) => {
            state.featureLayerProps.push(action.payload)
        }
    }
})

export const { addFeatureLayer } = featureSlice.actions

export const selectFeatureLayer = (state: RootState) => state.features.featureLayerProps

export default featureSlice.reducer
