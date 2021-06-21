import * as React from "react"
import MapFloatingButton from "./MapFloatingButton"
import { env } from "../../../env"
import { loadModules } from "esri-loader"
import OffsetCanvasButton from "./OffsetCanvasButton"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectView, toggle3D } from "../../features/viewSlice"

type ViewToggleButtonProps = {
    view: __esri.MapView | __esri.SceneView | null,
    position: __esri.UIAddPosition
}

const ViewToggleButton : React.FC<ViewToggleButtonProps> = (props: ViewToggleButtonProps) => {

    const viewType = useAppSelector(selectView).type
    const dispatch = useAppDispatch()

    const changeLayout = () => {
        dispatch(toggle3D())
    }   

    React.useEffect(() => {
        const viewToggle : HTMLElement | null = document.querySelector("#viewToggle")

        props.view?.when(() => {
            props.view?.ui.add(viewToggle!, props.position)
        })

        return function cleanup() {
            props.view?.ui.remove(viewToggle!)
        }
    }, [ props.view ])

    return (
        <>
            <MapFloatingButton
                btnId="viewToggle"
                title={(viewType === '2d') ? '3D' : '2D'}
                onClick={changeLayout} />
        </>
    )
        
}

export default ViewToggleButton