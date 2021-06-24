import * as React from "react"
import { Coordinate } from "../utils/constants"
import ACTION from "../utils/popupAction"
import FeatureLayer from "./base_components/FeatureLayer"
import GroupLayer from "./base_components/GroupLayer"

type LayerProps = {
    map: __esri.Map | null
    view: __esri.MapView | __esri.SceneView | null
    data: __esri.LayerProperties[]
}


const Layers : Function = (props: LayerProps) : JSX.Element[] => {
    props.map?.removeAll()

    const allLayers = props.data

    // ----- POSSIBLY BUG ----- //

    React.useEffect(() => {

        props.view?.when(() => {
            const view = props.view!

            let coord : Coordinate = {latitude: 0, longitude: 0}

            view.on('click', (event) => {
                coord = {
                    latitude: Math.round(event.mapPoint.latitude * 10000) / 10000,
                    longitude: Math.round(event.mapPoint.longitude * 10000) / 10000
                }
                console.log(coord)
            })

            view.popup.viewModel.on("trigger-action", function(event) {
                const id = event.action.id
                const attributes = view.popup.viewModel.selectedFeature.attributes
                ACTION[id as keyof typeof ACTION](attributes, coord)
            });

        })

        return function cleanup() {
            props.map?.removeAll()
        }
    }, [ props.view ])

    return allLayers.map((properties, index) => 
        (properties.myType === "group-layer")
        ? <GroupLayer key={index} map={props.map} groupLayerProperties={properties} />
        : <FeatureLayer key={index} map={props.map} featureLayerProperties={properties} />
    )
}

export default Layers
