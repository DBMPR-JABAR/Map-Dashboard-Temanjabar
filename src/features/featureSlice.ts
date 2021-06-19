import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { mapOptions, mapViewOptions } from '../utils/map'
import { jalanProvinsiConfig } from '../utils/map_config/jalan_provinsi'

export interface FeatureState {
    featureLayerProps: __esri.FeatureLayerProperties[]
    uptd: string[]
    sup: string[]
    kegiatan: string[]
}
  
const initialState: FeatureState = {
    featureLayerProps : [
        // {url: "https://tj.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/4/"}
    ],
    uptd: [],
    sup: [],
    kegiatan: []
}

export const featureSlice = createSlice({
    name: 'esri',
    initialState,
    reducers: {
        addFeatureLayer: (state, action: PayloadAction<__esri.FeatureLayerProperties>) => {
            state.featureLayerProps.push(action.payload)
        },
        setUPTD: (state, action: PayloadAction<string[]>) => {
            state.uptd = action.payload
        },
        setSPP: (state, action: PayloadAction<string[]>) => {
            state.sup = action.payload
        }
    }
})

export const { addFeatureLayer, setUPTD, setSPP } = featureSlice.actions

export const selectFeature = (state: RootState) => state.features

export default featureSlice.reducer
