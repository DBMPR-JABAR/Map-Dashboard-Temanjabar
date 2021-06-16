import * as React from "react"
import { useState } from "react"
import FeatureLayers from "./FeatureLayers"
import ScaleBar from "./base_components/ScaleBar"
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectMapType, toggle3D } from "../../features/viewSlice"
import BasemapGallery from "./base_components/BasemapGallery"
import { addFeatureLayer, selectFeatureLayer } from "../../features/featureSlice"
import { mapOptions, mapViewOptions, sceneViewOptions } from "../../utils/map"
import EsriMap from "./base_components/EsriMap"
import LayerList from "./base_components/LayerList"
import Legends from "./base_components/Legends"


function MapScene() {
    const mapType = useAppSelector(selectMapType)
    const layers = useAppSelector(selectFeatureLayer)

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

                <BasemapGallery view={view} position={{ position: "top-right" }} />
                <FeatureLayers view={view} map={map} data={layers} />
                <ScaleBar view={view} position={{ position: "bottom-left" }} />
                <LayerList view={view} position={{ position: "bottom-right" }} />
                <Legends view={view} position={{ position: "bottom-left", index: 1 }} />
                
            </EsriMap>

            <button onClick={ () => addLayer()}>Debug Layer</button>
            <button onClick={ () => dispatch(toggle3D())}>3D Map</button>
        </>
    )
}

export default MapScene
