import  { useState, useEffect, FunctionComponent } from 'react'
import  * as React from 'react'
import { loadModules } from 'esri-loader'
import OffsetCanvasButton from './OffsetCanvasButton'
import { useAppSelector } from '../../app/hooks'
import { selectFeature } from '../../features/featureSlice'

export type LegendsProps = {
    view: __esri.MapView | __esri.SceneView | null,
    position: __esri.UIAddPosition
}

const LayerList : FunctionComponent<LegendsProps> = (props: LegendsProps) => {
    const [layerList, setLayerList] = useState(null)
    const isLayerDisplayed = useAppSelector(selectFeature).kegiatan.length > 0
    
    useEffect(() => {
        const containerLayerList : HTMLElement | null = document.querySelector("#offcanvasLayerList")
        const elementLayerList : HTMLElement | null = document.querySelector("#layerListBtn")

        loadModules(["esri/widgets/LayerList",
                     "esri/widgets/Expand"]).then(([LayerList, Expand]) => {

            const mLayerList = new Expand({
                content: new LayerList({
                    container: containerLayerList,
                    view: props.view,
                    id: 'layerList'
                }),
                view: props.view,
                expanded: true,
                expandIconClass: 'esri-icon-layers',
                expandTooltip: 'Layer Aktif'
            })

            setLayerList(mLayerList)
            props.view?.ui.add(elementLayerList!, props.position)


        }).catch((err) => console.error(err))

        return function cleanup() {
            props.view?.ui.remove(elementLayerList!)
            setLayerList(null)
        }
    }, [ props.view ])

    return (
        <OffsetCanvasButton
            btnId="layerListBtn"
            offsetId="displayLayerList"
            icon="fas fa-layer-group"
            position="end"
            title="Layer List"
            visible={(isLayerDisplayed) ? true : false}
            > 
            <div id="offcanvasLayerList"></div>
        </OffsetCanvasButton>
    )
}


export default LayerList