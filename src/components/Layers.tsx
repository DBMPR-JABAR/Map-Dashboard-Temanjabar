import * as React from "react"
import { Coordinate } from "../utils/constants"
import ACTION from "../utils/popupAction"
import FeatureLayer from "./base_components/FeatureLayer"

type LayersProps = {
    map: __esri.Map | null
    view: __esri.MapView | __esri.SceneView | null
}

const Layers : React.FC<LayersProps> = (props: LayersProps) => {
    // props.map?.removeAll()

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

    return null
}

export default Layers
