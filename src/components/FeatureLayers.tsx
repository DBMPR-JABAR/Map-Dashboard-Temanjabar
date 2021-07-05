import * as React from "react"
import { loadModules } from "esri-loader"
import * as _ from "lodash"

type FeatureLayersProps = {
    layers: __esri.LayerProperties[]
    map: __esri.Map | null,
    view: __esri.MapView | __esri.SceneView | null,
    id: string
}

const FeatureLayers : React.FC<FeatureLayersProps> = (props: FeatureLayersProps) => {
    const [layer, setLayer] = React.useState<__esri.LayerProperties[]>([])
    
    React.useEffect(() => {
        
        setLayer([])
        props.map?.removeAll()

    }, [props.id])

    React.useEffect(() => {

        loadModules(['esri/layers/FeatureLayer',
                     'esri/layers/GroupLayer']).then(([FeatureLayer, GroupLayer]) => {

            const deletePlease = _.difference(layer, props.layers)

            deletePlease.forEach((layerProp) => {
                const rendererdLayer = props.map?.findLayerById(layerProp.id!)
                props.map?.remove(rendererdLayer!)
            })

            props.layers.forEach(layerProp => {
                const rendererdLayer = props.map?.findLayerById(layerProp.id!)
                if(rendererdLayer) return

                if(layerProp.myType === "group-layer"){
                    const properties = layerProp as __esri.GroupLayerProperties
                    const groupLayer = new GroupLayer({
                        id: properties.id,
                        title: properties.title
                    })
                    properties.layers?.forEach(insideLayer => {
                        groupLayer.add(new FeatureLayer(insideLayer))
                    })

                    props.map?.add(groupLayer)
                }else{
                    const properties = layerProp as __esri.FeatureLayerProperties
                    const featureLayer = new FeatureLayer(properties)
                    
                    props.map?.add(featureLayer)
                }

            })

            setLayer(props.layers)

        }).catch((err) => console.error(err))

    }, [props.view, props.layers])

    return null
}

export default FeatureLayers