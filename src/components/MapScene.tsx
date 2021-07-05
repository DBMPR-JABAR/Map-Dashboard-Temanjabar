import * as React from "react"
import { useState } from "react"
import { useAppSelector } from '../app/hooks'
import { selectView} from "../features/viewSlice"
import { mapOptions, mapViewOptions, sceneViewOptions } from "../utils/map"

import BasemapGallery from "./base_components/BasemapGallery"
import ScaleBar from "./base_components/ScaleBar"
import EsriMap from "./base_components/EsriMap"
import LayerList from "./base_components/LayerList"
import Legends from "./base_components/Legends"
import ControlButton from "./base_components/ControlButton"
import Filter from "./base_components/Filter"
import ViewToggleButton from "./base_components/ViewToggleButton"
import LayerRenderer from "./LayerRenderer"
import SearchWidget from "./base_components/SearchWidget"
import SearchSource from "./SearchSource"

function MapScene() {
    const mapType = useAppSelector(selectView).type

    const [map, setMap] = useState<__esri.Map | null>(null)
    const [view, setView] = useState<__esri.MapView | __esri.SceneView | null>(null)

    const handleError = (e: any) => console.log(e)

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
                <LayerRenderer view={view} map={map} />
                <ScaleBar view={view} position={{ position: "bottom-left" }} />
                <LayerList view={view} position={{ position: "bottom-right" }} />
                <Legends view={view} position={{ position: "bottom-left" }} />
                <SearchWidget view={view} position={{ position: "top-left", index: 0 }} />
                <SearchSource view={view} />

            </EsriMap>
        </>
    )
}

export default MapScene
