import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import * as _ from 'lodash'
import { HAS_TANGGAL, Tanggal } from '../utils/constants'
import { FeatureSetMap } from '../components/Layers'

export interface FeatureState {
    featureLayer: FeatureSetMap[]
    uptd: string[]
    sup: string[]
    kegiatan: string[],
    tanggal: Tanggal
}
  
const initialState: FeatureState = {
    featureLayer : [],
    uptd: [],
    sup: [],
    kegiatan: [],
    tanggal: {
        displayed: false,
        mulai: "2000-01-01",
        sampai: new Date().toISOString().substr(0, 10)
    }
}

export const featureSlice = createSlice({
    name: 'esri',
    initialState,
    reducers: {
        addLayer: (state, action: PayloadAction<FeatureSetMap>) => {
            state.featureLayer.push(action.payload)
        },
        setLayer: (state, action: PayloadAction<FeatureSetMap[]>) => {
            state.featureLayer = action.payload
        },
        removeLayer: (state, action: PayloadAction<string>) => {
            _.remove(state.featureLayer, {
                id: action.payload
            })
        },
        setUPTD: (state, action: PayloadAction<string[]>) => {
            state.uptd = action.payload
        },
        setSPP: (state, action: PayloadAction<string[]>) => {
            state.sup = action.payload
        },
        setKegiatan: (state, action: PayloadAction<string[]>) => {
            state.kegiatan = action.payload
            state.tanggal.displayed = (_.isEmpty(_.intersection(action.payload, HAS_TANGGAL))) ? false : true
        },
        setTanggal: (state, action: PayloadAction<Tanggal>) => {
            state.tanggal = action.payload
        },
    }
})

export const { addLayer, setLayer, removeLayer, setUPTD, setSPP, setKegiatan, setTanggal } = featureSlice.actions

export const selectFeature = (state: RootState) => state.features

export default featureSlice.reducer
