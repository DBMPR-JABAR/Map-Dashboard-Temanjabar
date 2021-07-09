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

const Legends : FunctionComponent<LegendsProps> = (props: LegendsProps) => {
    const [legends, setLegends] = useState(null)
    const isLayerDisplayed = useAppSelector(selectFeature).kegiatan.length > 0
    
    useEffect(() => {
        const containerLegends : HTMLElement | null = document.querySelector("#offcanvasLegends")
        const elementLegends : HTMLElement | null = document.querySelector("#legendBtn")

        loadModules(["esri/widgets/Legend",
                     "esri/widgets/Expand"]).then(([Legend, Expand]) => {

            const mLegends = new Expand({
                content: new Legend({
                    container: containerLegends,
                    view: props.view,
                    id: 'lgd',
                    style: "classic" // other styles include 'classic'
                }),
                view: props.view,
                expanded: true,
                expandIconClass: 'esri-icon-legend',
                expandTooltip: 'Legenda'
            })

            setLegends(mLegends)
            props.view?.ui.add(elementLegends!, props.position)


        }).catch((err) => console.error(err))

        return function cleanup() {
            props.view?.ui.remove(elementLegends!)
            setLegends(null)
        }
    }, [ props.view ])

    return (
        <OffsetCanvasButton
            btnId="legendBtn"
            offsetId="displayLegend"
            icon="fas fa-map-signs"
            position="start"
            title="Legenda"
            visible={(isLayerDisplayed) ? true : false}
            > 
            <div id="offcanvasLegends"></div>
        </OffsetCanvasButton>
    )
}

export default Legends