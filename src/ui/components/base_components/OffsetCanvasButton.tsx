import * as React from "react"

type OffsetCanvasProps = {
    btnId: string
    title: string
    offsetId: string
    icon: string
    position: 'start' | 'end'
    children: React.ReactNode
}


const OffsetCanvasButton : React.FC<OffsetCanvasProps> = (props: OffsetCanvasProps) => {
    return <>
        <div
            id={props.btnId}
            aria-expanded="false"
            className="esri-widget--button"
            role="button"
            tabIndex={0}
            title={props.title}
            data-bs-toggle="offcanvas" data-bs-target={'#'+props.offsetId}>
            <span
                aria-hidden="true"
            ><i className={props.icon}></i></span>
            <span className="esri-icon-font-fallback-text">
                {props.title}
            </span>
        </div>
        <div className={'offcanvas offcanvas-'+props.position} tabIndex={-1} id={props.offsetId} aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">{props.title}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {props.children}
            </div>
        </div>
    </>
}

export default OffsetCanvasButton