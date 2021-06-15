import * as React from "react"
import { useState } from "react"
import FeatureLayers from "./FeatureLayers"
import ScaleBar from "./esri_components/ScaleBar"
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectMapType, toggle3D } from "../../features/viewSlice"
import BasemapGallery from "./esri_components/BasemapGallery"
import { addFeatureLayer, selectFeatureLayer } from "../../features/featureSlice"
import { mapOptions, mapViewOptions, sceneViewOptions } from "../../utils/map"
import EsriMap from "./esri_components/EsriMap";

function MapScene() {
    const mapType = useAppSelector(selectMapType)
    const layers = useAppSelector(selectFeatureLayer)

    const dispatch = useAppDispatch()

    const [map, setMap] = useState<__esri.Map | null>(null);
    const [view, setView] = useState<__esri.MapView | __esri.SceneView | null>(null);

    const handleError = (e: any) => console.log(e)
    const handleLoad = (map: __esri.Map, view: __esri.MapView | __esri.SceneView) => {
        setMap(map)
        setView(view)
    }

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
            handleLoad={ handleLoad }
            handleError= { handleError }>
            <BasemapGallery view={view} position={{ position: "top-right" }} />
            <FeatureLayers map={map} data={layers} />
            <ScaleBar view={view} position={{ position: "bottom-left" }} />
        </EsriMap>
        <button onClick={ () => addLayer()}>Debug Layer</button>
        <button onClick={ () => dispatch(toggle3D())}>3D Map</button>
        </>
    )
}

export default MapScene
