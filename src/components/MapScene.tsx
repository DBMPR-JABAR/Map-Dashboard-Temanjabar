import * as React from "react"
import { useState } from "react"
import FeatureLayers from "./FeatureLayers"
import ScaleBar from "./base_components/ScaleBar"
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectView} from "../features/viewSlice"
import BasemapGallery from "./base_components/BasemapGallery"
import { addFeatureLayer, selectFeature } from "../features/featureSlice"
import { mapOptions, mapViewOptions, sceneViewOptions } from "../utils/map"
import EsriMap from "./base_components/EsriMap"
import LayerList from "./base_components/LayerList"
import Legends from "./base_components/Legends"
import ControlButton from "./base_components/ControlButton"
import Filter from "./base_components/Filter"
import ViewToggleButton from "./base_components/ViewToggleButton"
import Layers from "./Layers"

function MapScene() {
    const mapType = useAppSelector(selectView).type
    const coordinate = useAppSelector(selectView).coordinate

    const dispatch = useAppDispatch()

    const [map, setMap] = useState<__esri.Map | null>(null)
    const [view, setView] = useState<__esri.MapView | __esri.SceneView | null>(null)

    const handleError = (e: any) => console.log(e)

    const addLayer = () => {
        dispatch(addFeatureLayer({
            url: "https://tj.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/0/"
        }))
    }

    return (
        <>
            <EsriMap
                type = { mapType }
                mapProps = { mapOptions }
                mapViewProps = { mapViewOptions }
                sceneViewProps = { sceneViewOptions }
                handleError= { handleError }>

                <ViewToggleButton view={view} position={{ position: "top-left" }} />
                <Filter view={view} position={{ position: "top-right", index: 0 }} />
                <BasemapGallery view={view} position={{ position: "top-right", index: 1 }} />
                <ControlButton view={view} position={{ position: "top-right" }} />
                <Layers view={view} map={map} />
                <ScaleBar view={view} position={{ position: "bottom-left" }} />
                <LayerList view={view} position={{ position: "bottom-right" }} />
                <Legends view={view} position={{ position: "bottom-left" }} />
                
            </EsriMap>

            <button onClick={ () => addLayer()}>Debug Layer</button>
            <button onClick={ () => console.log(coordinate)}>Get Coordinate</button>
        </>
    )
}

export default MapScene
