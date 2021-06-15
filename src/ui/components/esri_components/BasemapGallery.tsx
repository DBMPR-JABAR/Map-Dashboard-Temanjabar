import  { useState, useEffect, FunctionComponent } from 'react';
import  * as React from 'react';
import { loadModules } from 'esri-loader';

export type BasemapGalleryProps = {
    view: __esri.MapView | __esri.SceneView | null,
    position: __esri.UIAddPosition
}

const BasemapGallery : FunctionComponent<BasemapGalleryProps> = (props: BasemapGalleryProps) => {
    const [basemapGallery, setBasemapGallery] = useState(null);
    
    useEffect(() => {
        const container : HTMLElement | null = document.querySelector("#offcanvasBasemap")
        const element : HTMLElement | null = document.querySelector("#changeBasemapBtn")

        loadModules(['esri/widgets/BasemapGallery']).then(([BasemapGallery]) => {
            const basemap = new BasemapGallery({
                view: props.view,
                container: container
            });
            setBasemapGallery(basemap);

            props.view?.ui.add(element!, props.position)


        }).catch((err) => console.error(err))

        return function cleanup() {
            props.view?.ui.remove(element!)
            setBasemapGallery(null)
        }
    }, [ props.view ])

    return <BasemapOffcanvas />
}

const BasemapOffcanvas = () => {
    
    return <>
    <div
        id="changeBasemapBtn"
        aria-expanded="false"
        className="esri-widget--button"
        role="button"
        tabIndex={0}
        title="Ubah Basemap"
        data-bs-toggle="offcanvas" data-bs-target="#changeBasemap"
    >
        <span
            aria-hidden="true"
        ><i className="fas fa-map"></i></span>
        <span className="esri-icon-font-fallback-text">
            Ubah Basemap
        </span>
    </div>
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="changeBasemap" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Ubah Basemap</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <div id="offcanvasBasemap"></div>
        </div>
    </div>
    </>
}

export default BasemapGallery;