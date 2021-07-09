import  { useState, useEffect, FunctionComponent } from 'react'
import { loadModules } from 'esri-loader'

export type GroupLayerProps = {
    groupLayerProperties: __esri.GroupLayerProperties,
    map: __esri.Map | null,
    id: string
}

const GroupLayer : FunctionComponent<GroupLayerProps> = (props: GroupLayerProps) => {
    
    useEffect(() => {
        const layer = props.map?.findLayerById(props.groupLayerProperties.id!)        
        if(layer){
            props.map?.remove(layer)
        }

        loadModules(['esri/layers/FeatureLayer','esri/layers/GroupLayer']).then(([FeatureLayer, GroupLayer]) => {

            const addGroupLayer = new Promise((resolve, reject) => {

                const groupLayer = new GroupLayer({
                    id: props.groupLayerProperties.id,
                    title: props.groupLayerProperties.title,
                })

                props.groupLayerProperties.layers?.forEach((value) => {

                    const layer = props.map?.findLayerById(value.id!)
                    if(layer){
                        props.map?.remove(layer)
                    }
    
                    groupLayer.add(new FeatureLayer(value))
                })

                props.map?.add(groupLayer);
                resolve(groupLayer);
            })

            addGroupLayer

        }).catch((err) => console.error(err))

        return function cleanup() {
            const layer = props.map?.findLayerById(props.groupLayerProperties.id!)        
            if(layer){
                props.map?.remove(layer)
            }
        }
    }, [props.id])

    return null
}

export default GroupLayer