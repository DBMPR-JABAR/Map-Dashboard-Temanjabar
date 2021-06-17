import { Map, Scene } from "@esri/react-arcgis"
import { EventProperties } from "@esri/react-arcgis/dist/esm/components/ArcBase"
import * as React from "react"

type EsriMapProps = {
    type: "2d" | "3d"
    mapProps: __esri.MapProperties,
    mapViewProps: __esri.MapViewProperties,
    sceneViewProps: __esri.SceneViewProperties,
    handleError: ((e: any) => any) | undefined,
    children: React.ReactNode
}

const EsriMap : React.FunctionComponent<EsriMapProps> = (props : EsriMapProps) => {

    return (props.type === '2d')
            ? <Map  mapProperties={props.mapProps} 
                    viewProperties={props.mapViewProps}
                    onFail={props.handleError}>{props.children}</Map>
            : <Scene mapProperties={props.mapProps}
                     viewProperties={props.sceneViewProps}
                     onFail={props.handleError} >{props.children}</Scene>
}

export default EsriMap

