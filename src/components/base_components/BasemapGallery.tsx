import  { useState, useEffect, FunctionComponent } from 'react'
import  * as React from 'react'
import { loadModules } from 'esri-loader'
import OffsetCanvasButton from './OffsetCanvasButton'

export type BasemapGalleryProps = {
    view: __esri.MapView | __esri.SceneView | null,
    position: __esri.UIAddPosition
}

const BasemapGallery : FunctionComponent<BasemapGalleryProps> = (props: BasemapGalleryProps) => {
    const [basemapGallery, setBasemapGallery] = useState(null)
    
    useEffect(() => {
        const container : HTMLElement | null = document.querySelector("#offcanvasBasemap")
        const element : HTMLElement | null = document.querySelector("#changeBasemapBtn")

        loadModules(['esri/widgets/BasemapGallery']).then(([BasemapGallery]) => {
            const basemap = new BasemapGallery({
                view: props.view,
                container: container
            })
            setBasemapGallery(basemap)

            props.view?.ui.add(element!, props.position)


        }).catch((err) => console.error(err))

        return function cleanup() {
            props.view?.ui.remove(element!)
            setBasemapGallery(null)
        }
    }, [ props.view ])

    return (
        <OffsetCanvasButton
            btnId="changeBasemapBtn"
            offsetId="changeBasemap"
            icon="fas fa-map"
            position="end"
            title="Ubah Basemap"> 
            <div id="offcanvasBasemap"></div>
        </OffsetCanvasButton>
    )
    
}

export default BasemapGallery