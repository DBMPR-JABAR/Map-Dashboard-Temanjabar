import * as React from "react"

type MapFloatingButtonProps = {
    btnId: string
    title: string
    icon: string
    onClick: React.MouseEventHandler<HTMLDivElement>
}


const MapFloatingButton : React.FC<MapFloatingButtonProps> = (props: MapFloatingButtonProps) => {
    return <div
                id={props.btnId}
                aria-expanded="false"
                className="esri-widget--button"
                role="button"
                tabIndex={0}
                title={props.title}
                onClick={props.onClick}>
            <span aria-hidden="true"><i className={props.icon}></i></span>
            <span className="esri-icon-font-fallback-text">
                {props.title}
            </span>
        </div>
}
export default MapFloatingButton

