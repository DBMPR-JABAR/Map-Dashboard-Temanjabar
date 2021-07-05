import * as _ from "lodash"
import * as React from "react"
import { useAppDispatch } from "../app/hooks"
import { addLayer, FeatureState, removeLayer, setLayer } from "../features/featureSlice"
import { Coordinate } from "../utils/constants"
import ACTION from "../utils/popupAction"
import FeatureLayers from "./FeatureLayers"

type LayerProps = {
    map: __esri.Map | null
    view: __esri.MapView | __esri.SceneView | null
    data: __esri.LayerProperties[]
    features: FeatureState
}

export type FeatureSetMap = {
    id: string
    layer: __esri.FeatureLayer
    features: __esri.FeatureSet
}

const Layers : React.FC<LayerProps> = (props: LayerProps) => {
    const dispatch = useAppDispatch()

    const generateId = () => {
        const features = props.features

        const salt = Math.random()
        const uptdString = features.uptd.join('')
        const supString = features.sup.join('')
        const tglString = `${features.tanggal.mulai}${features.tanggal.sampai}`
        const kegiatan = features.kegiatan.join('')

        const string = `${uptdString}${supString}${tglString}`

        return btoa(string)
    }

    React.useEffect(() => {

        props.view?.when(() => {
            const view = props.view!

            let coord : Coordinate = {latitude: 0, longitude: 0}

            view.on('click', (event) => {
                coord = {
                    latitude: Math.round(event.mapPoint.latitude * 10000) / 10000,
                    longitude: Math.round(event.mapPoint.longitude * 10000) / 10000
                }
            })

            view.popup.viewModel.on("trigger-action", function(event) {
                const id = event.action.id
                const attributes = view.popup.viewModel.selectedFeature.attributes
                ACTION[id as keyof typeof ACTION](attributes, coord)
            });
            
            view.on("layerview-create", (event) => {
                const featureLayer = event.layer as __esri.FeatureLayer

                if(featureLayer.searchField === undefined) return 

                featureLayer.queryFeatures().then((features) => {
                    const map : FeatureSetMap = {
                        id: featureLayer.id, 
                        layer: featureLayer,
                        features: features
                    }
                    dispatch(addLayer(map))
                })

            })

            view.on("layerview-destroy", (event) => {
                const featureLayer = event.layer as __esri.FeatureLayer

                if(featureLayer.searchField === undefined) return 
                
                dispatch(removeLayer(featureLayer.id))
            })
            
        
        })

    }, [ props.view ])

    return <FeatureLayers id={generateId()} layers={props.data} map={props.map} />
}

export default Layers


/*

const getDataFeature = (layer: __esri.FeatureLayer) => new Promise((resolve: {(x: __esri.FeatureSet): void}, reject) => {
    if(layer){
        props.view?.whenLayerView(layer).then((layerView) => {
            layerView.queryFeatures().then((features) => resolve(features))
        })
    }else{
        reject("NOT EXIST")
    }
})

const getFeatures = ids.map(id => {
    const layer = props.map?.findLayerById(id) as __esri.FeatureLayer
    return getDataFeature(layer)
})


Promise.all(getFeatures).then((value) => {
    console.log("Features", value)

}).catch((e) => {console.log(e)})

*/