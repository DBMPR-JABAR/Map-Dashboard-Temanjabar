import  { useState, useEffect, FunctionComponent } from 'react'
import { loadModules } from 'esri-loader'
import { useAppDispatch } from '../../app/hooks'
import { addLayer, removeLayer } from '../../features/featureSlice'

export type FeatureLayerProps = {
    featureLayerProperties: __esri.FeatureLayerProperties,
    map: __esri.Map | null,
    id: string
}

const FeatureLayer : FunctionComponent<FeatureLayerProps> = (props: FeatureLayerProps) => {
    const [myFeatureLayer, setMyFeatureLayer] = useState(null)
    
    useEffect(() => {
        loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {

            const layer = props.map?.findLayerById(props.featureLayerProperties.id!)
            if(layer){
                props.map?.remove(layer)
            }

            const myFeatureLayer = new FeatureLayer(
                props.featureLayerProperties
            )

            setMyFeatureLayer(myFeatureLayer)

            props.map?.add(myFeatureLayer)

        }).catch((err) => console.error(err))

        return function cleanup() {
            props.map?.remove(myFeatureLayer!)
        }
    }, [props.id])

    return null
}

export default FeatureLayer