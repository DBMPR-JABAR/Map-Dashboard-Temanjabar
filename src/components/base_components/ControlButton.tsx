import * as React from "react"
import MapFloatingButton from "./MapFloatingButton"

type ControlButtonProps = {
    view: __esri.MapView | __esri.SceneView | null,
    position: __esri.UIAddPosition
}

const ControlButton : React.FC<ControlButtonProps> = (props: ControlButtonProps) => {

    const toggleFullscreen = () => {
        if(document.fullscreenElement){
            return document.exitFullscreen()
        }
        return document.documentElement.requestFullscreen()
    }
    const back = () => {
        if(process.env.MODE == "internal"){
            window.location.href = `${process.env.BASE_URL}/admin`
        }else{
            window.location.href = `${process.env.BASE_URL}`
        }
    }

    React.useEffect(() => {
        const fullScreenBtn : HTMLElement | null = document.querySelector("#fullScreenBtn")
        const backBtn : HTMLElement | null = document.querySelector("#backBtn")

        props.view?.when(() => {
            props.view?.ui.add(fullScreenBtn!, props.position)
            props.view?.ui.add(backBtn!, props.position)
        })

        return function cleanup() {
            props.view?.ui.remove(fullScreenBtn!)
            props.view?.ui.remove(backBtn!)
        }
    }, [ props.view ])

    return (
        <>
            <MapFloatingButton
                btnId="fullScreenBtn"
                icon="fas fa-expand"
                title="Fullscreen"
                onClick={toggleFullscreen} />
            <MapFloatingButton
                btnId="backBtn"
                icon="fas fa-arrow-left"
                title="Kembali"
                onClick={back} />
        </>
    )
        
}

export default ControlButton