import * as React from "react"
import FeatureLayer from "./base_components/FeatureLayer"

type FeatureLayersProps = {
    map: __esri.Map | null
    data: __esri.FeatureLayerProperties[]
}

const FeatureLayers : Function = (props: FeatureLayersProps) : JSX.Element[] => {
    props.map?.removeAll()

    return props.data.map((properties, index) => 
        <FeatureLayer key={index} map={props.map} featureLayerProperties={properties} />
    )

}

export default FeatureLayers
