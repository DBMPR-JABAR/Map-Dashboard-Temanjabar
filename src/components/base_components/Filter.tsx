import  { useEffect, FunctionComponent } from 'react'
import  * as React from 'react'
import OffsetCanvasButton from './OffsetCanvasButton'
import FilterSelection from '../FilterSelection'

export type FilterProps = {
    view: __esri.MapView | __esri.SceneView | null,
    position: __esri.UIAddPosition
}

const Filter : FunctionComponent<FilterProps> = (props: FilterProps) => {
    
    useEffect(() => {
        const button : HTMLElement | null = document.querySelector("#filterBtn")

        props.view?.when(() => {
            props.view?.ui.add(button!, props.position)
        })

        return function cleanup() {
            props.view?.ui.remove(button!)
        }
    }, [ props.view ])

    return (
        <OffsetCanvasButton
            btnId="filterBtn"
            offsetId="displayFilter"
            icon="fas fa-filter"
            position="end"
            title="Filter"> 

            <FilterSelection />
        
        </OffsetCanvasButton>
    )
}


export default Filter