import  { useState, useEffect, FunctionComponent } from 'react'
import { loadModules } from 'esri-loader'

export type GroupLayerProps = {
    groupLayerProperties: __esri.GroupLayerProperties,
    map: __esri.Map | null
}

const GroupLayer : FunctionComponent<GroupLayerProps> = (props: GroupLayerProps) => {
    const [myGroupLayer, setMyGroupLayer] = useState(null)
    
    useEffect(() => {
        loadModules(['esri/layers/FeatureLayer','esri/layers/GroupLayer']).then(([FeatureLayer, GroupLayer]) => {
            const newGroupLayer = new GroupLayer({
                id: props.groupLayerProperties.id,
                title: props.groupLayerProperties.title,
            })

            props.groupLayerProperties.layers?.forEach((value) => {
                newGroupLayer.add(new FeatureLayer(value))
            })

            setMyGroupLayer(newGroupLayer)
            props.map?.add(newGroupLayer)

        }).catch((err) => console.error(err))

        return function cleanup() {
            props.map?.remove(myGroupLayer!)
        }
    }, [ props ])

    return null
}

export default GroupLayer