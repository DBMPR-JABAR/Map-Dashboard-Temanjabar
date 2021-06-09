import * as React from "react"
import { Map } from "@esri/react-arcgis"
import { mapOptions, viewOptions } from '../../utils/map'
import FeatureLayer from "./FeatureLayer"


type EsriMapState = {
    map: __esri.Map | null,
    view: __esri.MapView | __esri.SceneView | null
}


class EsriMap extends React.Component<any, EsriMapState> {
    
    constructor(props: any){
        super(props)
        this.state = {
            map: null,
            view: null
        }
        this.handleMapError = this.handleMapError.bind(this)
        this.handleMapLoad = this.handleMapLoad.bind(this)
    }

    handleMapLoad(map: __esri.Map, view: __esri.MapView | __esri.SceneView){
        this.setState({
            map: map,
            view: view
        })
    }
    handleMapError(e : any){
        console.log(e)
    }

    render() {
        return (
            <Map
                mapProperties={ mapOptions }
                viewProperties={ viewOptions } 
                onLoad={this.handleMapLoad}
                onFail= {this.handleMapError} >
                <FeatureLayer
                    map = {this.state.map}
                    featureLayerProperties={{
                        url: 'https://tj.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/4/'
                    }} />
            </Map>
        )
        
    }

}
export default EsriMap
